export const FORBIDDEN_MEMBERS = ['USLACKBOT', 'U02J0AKFD']; // Slack bot and Apptension user
export const TIMEZONE = 'Europe/Warsaw';
export const MESSAGE_SHORT = 'Quarterly skills matrix update';
export const MESSAGE_FULL = [
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
      text: `You can do it <https://radar.apptension.com/matrix/knowledge|here>`,
    },
  },
];
