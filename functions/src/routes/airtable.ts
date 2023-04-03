import * as functions from 'firebase-functions';
import { AIRTABLE_FIELDS } from '../constants/airtable';
import { getAirtable } from '../services/airtable';
import { filterSkillsBySearch, filterSkilsByCategoryId, filterUserByEmailFormula } from '../utils/airtable/formulas';
import { corsHandler } from '../utils/corsHandler';
import { getIsoDateWithoutTime } from '../utils/time';
import { SECRET_KEYS } from '../constants/secretKeys';

// * TYPES FOR AIRTABLE OBJECTS ARE SET TO ANY AS AIRTABLE LACKS TYPE DECLARATIONS FOR THEM
const { BASE, BASE_VIEWS, CATEGORY_FIELDS, SENIORITY_FIELDS, SKILL_FIELDS, USER_FIELDS } = AIRTABLE_FIELDS;

export const getUserPersonalInfo = functions
  .runWith({ secrets: [SECRET_KEYS.AIRTABLE_API_KEY, SECRET_KEYS.AIRTABLE_BASE, SECRET_KEYS.WEBAPP_URL] })
  .https.onRequest(async (req, res) => {
    corsHandler(process.env.WEBAPP_URL || '')(req, res, async () => {
      const airtable = getAirtable(
        process.env[SECRET_KEYS.AIRTABLE_API_KEY] || '',
        process.env[SECRET_KEYS.AIRTABLE_BASE] || ''
      );

      const { email } = req.query;
      airtable(BASE.USERS)
        .select({ view: BASE_VIEWS.RESULTS, filterByFormula: filterUserByEmailFormula(email as string) })
        .firstPage(async (err: any, records: any) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ success: false });
          }

          const createNewUser = async () => {
            try {
              const [data] = await airtable(BASE.USERS).create([{ fields: { [USER_FIELDS.EMAIL]: email } }]);
              res.json({ id: data.id, personalInfo: { email: data.get(USER_FIELDS.EMAIL) } });
            } catch (err) {
              res.status(500).json({ success: false });
            }
          };

          if (records.length === 0) {
            return createNewUser();
          }

          const userInfo = records.map((record: any) => ({
            id: record.id,
            submitDate: record.get(USER_FIELDS.SUBMIT_DATE) || '',
            personalInfo: {
              email: record.get(USER_FIELDS.EMAIL),
              name: record.get(USER_FIELDS.NAME),
              slackId: record.get(USER_FIELDS.SLACK_ID),
              seniority: record.get(USER_FIELDS.SENIORITY)?.[0] || '',
              position: record.get(USER_FIELDS.POSITION)?.[0] || '',
            },
            additionalInfo: {
              additionalSkills: record.get(USER_FIELDS.ADDITIONAL_SKILLS),
              likeToLearn: record.get(USER_FIELDS.LIKE_TO_LEARN),
            },
          }));

          const { personalInfo, additionalInfo, skills, id, submitDate } = userInfo[0];
          return res.json({ id, personalInfo, skills, additionalInfo, submitDate });
        });
    });
  });

export const getUserSkills = functions
  .runWith({ secrets: [SECRET_KEYS.AIRTABLE_API_KEY, SECRET_KEYS.AIRTABLE_BASE, SECRET_KEYS.WEBAPP_URL] })
  .https.onRequest(async (req, res) => {
    corsHandler(process.env.WEBAPP_URL || '')(req, res, async () => {
      const airtable = getAirtable(
        process.env[SECRET_KEYS.AIRTABLE_API_KEY] || '',
        process.env[SECRET_KEYS.AIRTABLE_BASE] || ''
      );

      const { email } = req.query;
      airtable(BASE.USERS)
        .select({ view: BASE_VIEWS.RESULTS, filterByFormula: filterUserByEmailFormula(email as string) })
        .firstPage((err: any, records: any) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ success: false });
          }

          const userInfo = records.map((record: any) => ({
            id: record.id,
            skills: {
              expert: record.get(USER_FIELDS.SKILLS_EXPERT) || [],
              intermediate: record.get(USER_FIELDS.SKILLS_INTERMEDIATE) || [],
              shallow: record.get(USER_FIELDS.SKILLS_SHALLOW) || [],
            },
          }));

          const { skills, id } = userInfo[0];
          return res.json({ id, skills });
        });
    });
  });

export const getSeniorities = functions
  .runWith({ secrets: [SECRET_KEYS.AIRTABLE_API_KEY, SECRET_KEYS.AIRTABLE_BASE, SECRET_KEYS.WEBAPP_URL] })
  .https.onRequest(async (req, res) => {
    console.log(process.env.WEBAPP_URL);
    corsHandler(process.env.WEBAPP_URL || '')(req, res, async () => {
      const airtable = getAirtable(
        process.env[SECRET_KEYS.AIRTABLE_API_KEY] || '',
        process.env[SECRET_KEYS.AIRTABLE_BASE] || ''
      );

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

export const getPositions = functions
  .runWith({ secrets: [SECRET_KEYS.AIRTABLE_API_KEY, SECRET_KEYS.AIRTABLE_BASE, SECRET_KEYS.WEBAPP_URL] })
  .https.onRequest(async (req, res) => {
    corsHandler(process.env.WEBAPP_URL || '')(req, res, async () => {
      const airtable = getAirtable(
        process.env[SECRET_KEYS.AIRTABLE_API_KEY] || '',
        process.env[SECRET_KEYS.AIRTABLE_BASE] || ''
      );

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

export const getCategories = functions
  .runWith({ secrets: [SECRET_KEYS.AIRTABLE_API_KEY, SECRET_KEYS.AIRTABLE_BASE, SECRET_KEYS.WEBAPP_URL] })
  .https.onRequest(async (req, res) => {
    corsHandler(process.env.WEBAPP_URL || '')(req, res, async () => {
      const airtable = getAirtable(
        process.env[SECRET_KEYS.AIRTABLE_API_KEY] || '',
        process.env[SECRET_KEYS.AIRTABLE_BASE] || ''
      );

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

export const getSkills = functions
  .runWith({ secrets: [SECRET_KEYS.AIRTABLE_API_KEY, SECRET_KEYS.AIRTABLE_BASE, SECRET_KEYS.WEBAPP_URL] })
  .https.onRequest(async (req, res) => {
    console.log(process.env.WEBAPP_URL);
    corsHandler(process.env.WEBAPP_URL || '')(req, res, async () => {
      const airtable = getAirtable(
        process.env[SECRET_KEYS.AIRTABLE_API_KEY] || '',
        process.env[SECRET_KEYS.AIRTABLE_BASE] || ''
      );

      const { category, search } = req.query;
      const allSkills: any[] = [];
      airtable(BASE.SKILLS)
        .select({
          view: BASE_VIEWS.ALL,
          fields: [SKILL_FIELDS.NAME, SKILL_FIELDS.COLOR, SKILL_FIELDS.CATEGORY_ID],
          filterByFormula: category
            ? `AND(${filterSkilsByCategoryId(category as string)}, ${filterSkillsBySearch(search as string)})`
            : filterSkillsBySearch(search as string),
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

export const updateUser = functions
  .runWith({ secrets: [SECRET_KEYS.AIRTABLE_API_KEY, SECRET_KEYS.AIRTABLE_BASE, SECRET_KEYS.WEBAPP_URL] })
  .https.onRequest(async (req, res) => {
    corsHandler(process.env.WEBAPP_URL || '')(req, res, async () => {
      const airtable = getAirtable(
        process.env[SECRET_KEYS.AIRTABLE_API_KEY] || '',
        process.env[SECRET_KEYS.AIRTABLE_BASE] || ''
      );

      const { userId, skills, additionalData, personalData } = req.body;
      const { position, slackId, email, name, seniority } = personalData;
      const { expert, intermediate, shallow } = skills;
      const { additionalSkills, likeToLearn } = additionalData;

      airtable(BASE.USERS).update(
        [
          {
            id: userId,
            fields: {
              [USER_FIELDS.NAME]: name,
              [USER_FIELDS.EMAIL]: email,
              [USER_FIELDS.POSITION]: [position],
              [USER_FIELDS.LAST_SUBMIT]: getIsoDateWithoutTime(),
              [USER_FIELDS.ADDITIONAL_SKILLS]: additionalSkills,
              [USER_FIELDS.LIKE_TO_LEARN]: likeToLearn,
              [USER_FIELDS.SLACK_ID]: slackId,
              [USER_FIELDS.SENIORITY]: [seniority],
              [USER_FIELDS.SKILLS_EXPERT]: expert,
              [USER_FIELDS.SKILLS_INTERMEDIATE]: intermediate,
              [USER_FIELDS.SKILLS_SHALLOW]: shallow,
            },
          },
        ],
        (err: any) => {
          if (err) {
            console.error(err);
            return res.status(400).json({ success: false });
          }
          return res.json({ success: true });
        }
      );
    });
  });

export const updateUserProfile = functions
  .runWith({ secrets: [SECRET_KEYS.AIRTABLE_API_KEY, SECRET_KEYS.AIRTABLE_BASE, SECRET_KEYS.WEBAPP_URL] })
  .https.onRequest(async (req, res) => {
    corsHandler(process.env.WEBAPP_URL || '')(req, res, async () => {
      const airtable = getAirtable(
        process.env[SECRET_KEYS.AIRTABLE_API_KEY] || '',
        process.env[SECRET_KEYS.AIRTABLE_BASE] || ''
      );

      const { userId, position, slackId, email, name, seniority } = req.body;

      airtable(BASE.USERS).update(
        [
          {
            id: userId,
            fields: {
              [USER_FIELDS.NAME]: name,
              [USER_FIELDS.EMAIL]: email,
              [USER_FIELDS.POSITION]: [position],
              [USER_FIELDS.SLACK_ID]: slackId,
              [USER_FIELDS.SENIORITY]: [seniority],
            },
          },
        ],
        (err: any) => {
          if (err) {
            console.error(err);
            return res.status(400).json({ success: false });
          }
          return res.json({ success: true });
        }
      );
    });
  });
