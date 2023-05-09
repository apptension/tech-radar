import { Entry } from 'contentful-management';
import * as functions from 'firebase-functions';
import { DEFAULT_TIMEZONE } from '../constants';
import { AIRTABLE_FIELDS } from '../constants/airtable';
import { AIRTABLE_SECRET_KEYS, URL_SECRET_KEYS, CONTENTFUL_SECRET_KEYS } from '../constants/secretKeys';
import { getSecrets } from '../utils/getSecrets';
import { getAirtable } from '../services/airtable';
import { getEnvironment } from './../utils/contentful';
import { getContentfulClient } from './../services/contentful';

type SkillRecord = {
  label: string;
  specialistsAmount: number;
};

const { BASE_VIEWS, SKILL_FIELDS, BASE } = AIRTABLE_FIELDS;

const getAirtableData = async (): Promise<Record<string, number>> => {
  const { AIRTABLE_API_KEY, AIRTABLE_BASE } = getSecrets();
  const allSkills: SkillRecord[] = [];

  return new Promise((resolve, reject) => {
    const airtable = getAirtable(AIRTABLE_API_KEY, AIRTABLE_BASE);
    airtable(BASE.SKILLS)
      .select({
        view: BASE_VIEWS.ALL,
        fields: [SKILL_FIELDS.NAME, SKILL_FIELDS.INTERMEDIATE, SKILL_FIELDS.EXPERT],
      })
      .eachPage(
        function page(records: any, fetchNextPage: any) {
          allSkills.push(
            ...records.map((record: any) => {
              const intermediate = record.get(SKILL_FIELDS.INTERMEDIATE) || [];
              const experts = record.get(SKILL_FIELDS.EXPERT) || [];
              const specialistsAmount = experts.length + intermediate.length;

              const skill: SkillRecord = {
                label: record.get(SKILL_FIELDS.NAME),
                specialistsAmount,
              };
              return skill;
            })
          );

          fetchNextPage();
        },
        function done(err: any) {
          if (err) {
            functions.logger.error(`Failed to get Airtable data: ${err}`);
            return reject({});
          }
          const skillsReduced = allSkills.reduce((result, skill) => {
            result[skill.label] = skill.specialistsAmount;
            return result;
          }, {} as Record<string, number>);

          return resolve(skillsReduced);
        }
      );
  });
};

const getContentfulData = async (): Promise<Entry[]> => {
  return new Promise(async (resolve, reject) => {
    const { CONTENTFUL_TOKEN, CONTENTFUL_SPACE_ID, CONTENTFUL_ENVIRONMENT } = getSecrets();
    try {
      const client = getContentfulClient(CONTENTFUL_TOKEN);
      const contentfulConfig = { space: CONTENTFUL_SPACE_ID, environment: CONTENTFUL_ENVIRONMENT };
      const environment = await getEnvironment(client, contentfulConfig);
      const entries = await environment.getEntries({ content_type: 'entry', limit: 700 });
      resolve(entries.items);
    } catch (err) {
      functions.logger.error(`Failed to get Contentful data: ${err}`);
      reject([]);
    }
  });
};

export const updateSpecialistsAmount = functions
  .runWith({ secrets: [...AIRTABLE_SECRET_KEYS, ...CONTENTFUL_SECRET_KEYS, ...URL_SECRET_KEYS], timeoutSeconds: 540 })
  .pubsub.schedule('0 9 1,15 * *') //  runs at 1st and 15th day of every month 9:00
  .timeZone(DEFAULT_TIMEZONE)
  .onRun(async () => {
    const allSkills = await getAirtableData();
    const contentfulEntries = await getContentfulData();
    const entries = contentfulEntries.map((entry) => {
      const label = entry.fields.label?.['en-US'];
      const currentAmount = entry.fields.experts?.['en-US'];
      return {
        label,
        newAmount: allSkills[label],
        currentAmount: Number(currentAmount ?? 0),
        entry,
      };
    });

    for (const technology of entries) {
      const { label, currentAmount, newAmount, entry } = technology;
      if (!newAmount || currentAmount === newAmount) continue;
      try {
        functions.logger.info(`Changing ${label} experts field from ${currentAmount} to ${newAmount}`);
        entry.fields.experts = { 'en-US': newAmount };
        const updatedEntry = await entry.update();
        await updatedEntry.publish();
      } catch (err) {
        functions.logger.error(`Failed to update ${label} experts field: ${err}`);
      }
    }

    return null;
  });
