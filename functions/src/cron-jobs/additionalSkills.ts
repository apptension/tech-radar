import * as functions from 'firebase-functions';
import { DEFAULT_TIMEZONE } from '../constants';
import { AIRTABLE_FIELDS } from '../constants/airtable';
import { AIRTABLE_SECRET_KEYS, URL_SECRET_KEYS, SLACK_SECRET_KEYS } from '../constants/secretKeys';
import { getSecrets } from '../utils/getSecrets';
import { getAirtable } from '../services/airtable';
import { getSlackClient } from '../services/slack';

type SkillRecord = {
  name: string;
  additionalSkills: string;
};

const { BASE_VIEWS, SKILL_FIELDS, BASE } = AIRTABLE_FIELDS;
const MESSAGE_SHORT = 'New suggested skills';

const createSlackMessage = (list: SkillRecord[]) => {
  const body = [
    {
      type: 'header',
      text: {
        type: 'plain_text',
        text: 'Hey there! :wave:',
        emoji: true,
      },
    },
    {
      type: 'section',
      text: {
        type: 'plain_text',
        text: 'Some people have suggested adding these skills to TechRadar:',
        emoji: true,
      },
    },
    {
      type: 'divider',
    },
  ];

  const users = list.map((record) => ({
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: `*\`${record.name}\`*: \n${record.additionalSkills.toString()}`,
    },
  }));

  const fullMessage = [...body, ...users];
  return fullMessage;
};

const getAdditionalSkills = async (): Promise<SkillRecord[]> => {
  const { AIRTABLE_API_KEY, AIRTABLE_BASE } = getSecrets();
  const allAdditionalSkills: SkillRecord[] = [];

  return new Promise((resolve, reject) => {
    const airtable = getAirtable(AIRTABLE_API_KEY, AIRTABLE_BASE);
    airtable(BASE.USERS)
      .select({
        view: BASE_VIEWS.RESULTS,
        fields: [SKILL_FIELDS.NAME, SKILL_FIELDS.ADDITIONAL_SKILLS],
      })
      .eachPage(
        function page(records: any, fetchNextPage: any) {
          allAdditionalSkills.push(
            ...records.map((record: any) => {
              const name = record.get(SKILL_FIELDS.NAME);
              const additionalSkills = record.get(SKILL_FIELDS.ADDITIONAL_SKILLS) || '';

              const skill: SkillRecord = { name, additionalSkills };
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
          const skillsFiltered = allAdditionalSkills.filter((record) => record.additionalSkills.length > 0);

          return resolve(skillsFiltered);
        }
      );
  });
};

const sendMessageToUser = async (skills: SkillRecord[]) => {
  const { SLACK_TOKEN, SLACK_MAINTAINER_ID } = getSecrets();
  const slack = getSlackClient(SLACK_TOKEN);

  try {
    await slack.conversations.open({
      users: SLACK_MAINTAINER_ID,
    });
    await slack.chat.postMessage({
      channel: SLACK_MAINTAINER_ID,
      text: MESSAGE_SHORT,
      blocks: createSlackMessage(skills),
    });
    functions.logger.info(`Message sent successfully to user ${SLACK_MAINTAINER_ID}`);
  } catch (error) {
    functions.logger.error(`Error sending message to user ${SLACK_MAINTAINER_ID}: ${error}`);
  }
};

export const sendSuggestedSkills = functions
  .runWith({ secrets: [...AIRTABLE_SECRET_KEYS, ...SLACK_SECRET_KEYS, ...URL_SECRET_KEYS] })
  .pubsub.schedule('0 9 15 */3 *') //  runs at 15th day of every fourth month of the year at 9:00
  .timeZone(DEFAULT_TIMEZONE)
  .onRun(async () => {
    const additionalSkills = await getAdditionalSkills();
    if (additionalSkills.length > 0) await sendMessageToUser(additionalSkills);
    return null;
  });
