import * as functions from 'firebase-functions';
import { airtable } from '../services/airtable';
import { corsHandler } from '../utils/corsHandler';

export const getUserPersonalInfo = functions.https.onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    const { email } = req.query;
    airtable('Records copy')
      .select({
        view: 'Results',
        filterByFormula: `Email = "${email}"`,
      })
      .firstPage((err: any, records: any) => {
        if (err) {
          console.error(err);
          return;
        }
        const userInfo = records.map((record: any) => ({
          position: record.get('Position'),
          email: record.get('Email'),
          name: record.get('Name'),
          slackId: record.get('SlackID'),
        }));
        res.json({ userInfo: userInfo[0] });
      });
  });
});
