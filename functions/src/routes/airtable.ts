import * as functions from 'firebase-functions';
import { BASE, BASE_VIEWS, CATEGORY_FIELDS, SENIORITY_FIELDS, SKILL_FIELDS, USER_FIELDS } from '../constants/airtable';
import { airtable } from '../services/airtable';
import { filterSkillsBySearch, filterSkilsByCategoryId, filterUserByEmailFormula } from '../utils/airtable/formulas';
import { corsHandler } from '../utils/corsHandler';

// * TYPES FOR AIRTABLE OBJECTS ARE SET TO ANY AS AIRTABLE LACKS TYPE DECLARATIONS FOR THEM

export const getUserPersonalInfo = functions.https.onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    const { email } = req.query;
    airtable(BASE.USERS)
      .select({ view: BASE_VIEWS.RESULTS, filterByFormula: filterUserByEmailFormula(email as string) })
      .firstPage((err: any, records: any) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ success: false });
        }

        const userInfo = records.map((record: any) => ({
          email: record.get(USER_FIELDS.EMAIL),
          name: record.get(USER_FIELDS.NAME),
          slackId: record.get(USER_FIELDS.SLACK_ID),
          seniority: record.get(USER_FIELDS.SENIORITY)?.[0] || '',
          position: record.get(USER_FIELDS.POSITION)?.[0] || '',
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

export const getPositions = functions.https.onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    airtable(BASE.POSITIONS)
      .select({ view: BASE_VIEWS.GRID_VIEW })
      .firstPage((err: any, records: any) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ success: false });
        }

        const positions = records.map((record: any) => ({
          value: record.id,
          label: record.get(SENIORITY_FIELDS.NAME),
        }));

        return res.json({ positions });
      });
  });
});

export const getCategories = functions.https.onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    airtable(BASE.CATEGORIES)
      .select({ view: BASE_VIEWS.GRID, fields: [CATEGORY_FIELDS.NAME, CATEGORY_FIELDS.COLOR] })
      .firstPage((err: any, records: any) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ success: false });
        }

        const categories = records.map((record: any) => ({
          value: record.id,
          label: record.get(CATEGORY_FIELDS.NAME),
          color: record.get(CATEGORY_FIELDS.COLOR),
        }));

        return res.json({ categories });
      });
  });
});

export const getSkills = functions.https.onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    const { category, search } = req.query;
    const allSkills: any[] = [];
    airtable(BASE.SKILLS)
      .select({
        view: BASE_VIEWS.ALL,
        fields: [SKILL_FIELDS.NAME, SKILL_FIELDS.COLOR, SKILL_FIELDS.CATEGORY_ID],
        filterByFormula: `AND(${filterSkilsByCategoryId(category as string)}, ${filterSkillsBySearch(
          search as string
        )})`,
      })
      .eachPage(
        function page(records: any, fetchNextPage: any) {
          allSkills.push(
            ...records.map((record: any) => ({
              value: record.id,
              label: record.get(SKILL_FIELDS.NAME),
              color: record.get(SKILL_FIELDS.COLOR),
              categoryId: record.get(SKILL_FIELDS.CATEGORY_ID)?.[0] || '',
            }))
          );

          fetchNextPage();
        },
        function done(err: any) {
          if (err) {
            console.error(err);
            return res.status(500).json({ success: false });
          }
          return res.json({ skills: allSkills });
        }
      );
  });
});
