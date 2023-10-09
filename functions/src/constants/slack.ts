export const FORBIDDEN_MEMBERS = ['USLACKBOT', 'U02J0AKFD']; // Slack bot and Apptension user
export const BOT_CHANNEL_MESSAGE_SHORT = 'Quarterly skills matrix update';
export const BOT_CHANNEL_MESSAGE_FULL = [
  {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: "Hey there! :wave: We want to encourage everyone to develop as a company, not just as individuals. Make sure to check your skills matrix and update it with any new skills you've acquired!",
    },
  },
  {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: `You can do it <https://radar.apptension.com/matrix|here>`,
    },
  },
];
export const REMINDER_CHANNEL_MESSAGE_SHORT = 'Skills matrix update reminder';
export const REMINDER_CHANNEL_MESSAGE_FULL = [
  {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: "Hey there! :wave: Just a quick reminder about the skills matrix and its impact on our company's growth. Keeping it up to date helps us track employee skills and identify areas for improvement, which is important for our company's growth and development. :chart_with_upwards_trend:",
    },
  },
  {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: 'Have you had a chance to update yours yet?  You can do it <https://radar.apptension.com/matrix|here> :hammer_and_wrench:',
    },
  },
  {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: "Thank you for your contribution to our company's success! :pray::skin-tone-2:",
    },
  },
];
