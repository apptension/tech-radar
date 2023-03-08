import * as functions from 'firebase-functions';
import { BASE, BASE_VIEWS, SENIORITY_FIELDS, USER_FIELDS } from '../constants/airtable';
import { airtable } from '../services/airtable';
import { getUserByEmailFormula } from '../utils/airtable/getUserByEmailFormula';
import { corsHandler } from '../utils/corsHandler';

// * TYPES FOR AIRTABLE OBJECTS ARE SET TO ANY AS AIRTABLE LACKS TYPE DECLARATIONS FOR THEM

export const getUserPersonalInfo = functions.https.onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    const { email } = req.query;
    airtable(BASE.USERS)
      .select({ view: BASE_VIEWS.RESULTS, filterByFormula: getUserByEmailFormula(email as string) })
      .firstPage((err: any, records: any) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ success: false });
        }

        const userInfo = records.map((record: any) => ({
          position: record.get(USER_FIELDS.POSITION),
          email: record.get(USER_FIELDS.EMAIL),
          name: record.get(USER_FIELDS.NAME),
          slackId: record.get(USER_FIELDS.SLACK_ID),
          seniority: record.get(USER_FIELDS.SENIORITY)?.[0] || '',
        }));

        return res.json({ userInfo: userInfo[0] });
      });
  });
});

export const getSeniorities = functions.https.onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    airtable(BASE.SENIORITIES)
      .select({ view: BASE_VIEWS.GRID_VIEW })
      .firstPage((err: any, records: any) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ success: false });
        }

        const seniorities = records.map((record: any) => ({
          value: record.id,
          label: record.get(SENIORITY_FIELDS.NAME),
        }));

        return res.json({ seniorities });
      });
  });
});
