import * as functions from 'firebase-functions';
import { DEFAULT_TIMEZONE } from '../constants';
import { SLACK_SECRET_KEYS } from '../constants/secretKeys';
import {
  FORBIDDEN_MEMBERS,
  BOT_CHANNEL_MESSAGE_SHORT,
  BOT_CHANNEL_MESSAGE_FULL,
  REMINDER_CHANNEL_MESSAGE_SHORT,
  REMINDER_CHANNEL_MESSAGE_FULL,
} from '../constants/slack';
import { getSlackClient } from '../services/slack';
import { getSecrets } from '../utils/getSecrets';

const getSlackUsersIds = async () => {
  const { SLACK_TOKEN } = getSecrets();
  const slack = getSlackClient(SLACK_TOKEN);

  const usersList = await slack.users.list();

  if (usersList.error) console.error('Failed to fetch slack users data');
  if (!usersList.members) return [];

  const filteredList = usersList.members.filter((member) => {
    return (
      !member.is_bot &&
      !member.is_restricted &&
      !member.is_ultra_restricted &&
      !member.is_invited_user &&
      !member.deleted &&
      !FORBIDDEN_MEMBERS.includes(member.id || '')
    );
  });

  const usersIdsList = filteredList.map((user) => user.id);

  return usersIdsList as string[];
};

const sendMessageToUsers = async () => {
  const { SLACK_TOKEN } = getSecrets();
  const slack = getSlackClient(SLACK_TOKEN);
  const userIds = await getSlackUsersIds();

  for (const id of userIds) {
    try {
      await slack.conversations.open({
        users: id,
      });
      await slack.chat.postMessage({
        channel: id,
        text: BOT_CHANNEL_MESSAGE_SHORT,
        blocks: BOT_CHANNEL_MESSAGE_FULL,
      });
      functions.logger.info(`Message sent successfully to user ${id}`);
    } catch (error) {
      functions.logger.error(`Error sending message to user ${id}: ${error}`);
    }
  }
};

const sendMessageToChannel = async () => {
  const { SLACK_TOKEN, SLACK_REMINDER_CHANNEL_ID } = getSecrets();
  const slack = getSlackClient(SLACK_TOKEN);
  try {
    await slack.chat.postMessage({
      channel: SLACK_REMINDER_CHANNEL_ID,
      text: REMINDER_CHANNEL_MESSAGE_SHORT,
      blocks: REMINDER_CHANNEL_MESSAGE_FULL,
    });
    functions.logger.info(`Message sent successfully to channel ${SLACK_REMINDER_CHANNEL_ID}`);
  } catch (error) {
    functions.logger.error(`Error sending message to channel ${SLACK_REMINDER_CHANNEL_ID}: ${error}`);
  }
};

export const sendQuarterlyReminder = functions
  .runWith({ secrets: [...SLACK_SECRET_KEYS] })
  .pubsub.schedule('0 9 1 */3 *') // runs at 1st day of every fourth month of the year at 9:00
  .timeZone(DEFAULT_TIMEZONE)
  .onRun(async () => {
    await sendMessageToUsers();
    return null;
  });

export const sendFinalReminder = functions
  .runWith({ secrets: [...SLACK_SECRET_KEYS] })
  .pubsub.schedule('0 9 8 */3 *') // runs at 8th day of every fourth month of the year at 9:00
  .timeZone(DEFAULT_TIMEZONE)
  .onRun(async () => {
    await sendMessageToChannel();
    return null;
  });
