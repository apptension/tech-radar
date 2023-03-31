export enum DEV_BASE {
  USERS = 'tblljrHCnb1MCdaOh',
  SENIORITIES = 'tblazoEO9BXeMbQXj',
  POSITIONS = 'tblsP5T9GCsA1TLa9',
  CATEGORIES = 'tblLkeJQv3DCrll3z',
  SKILLS = 'tblKCffPPVutA2N8n',
}

export enum DEV_USER_FIELDS {
  NAME = 'Name',
  POSITION = 'Position1',
  LAST_SUBMIT = 'Submit Date',
  EMAIL = 'Email',
  SLACK_ID = 'SlackID',
  SENIORITY = 'Seniority',
  SUBMIT_DATE = 'Submit Date',
  ADDITIONAL_SKILLS = 'Not recorded',
  LIKE_TO_LEARN = 'Willing to learn',
  SKILLS_EXPERT = 'Expert knowledge',
  SKILLS_INTERMEDIATE = 'Intermediate knowledge',
  SKILLS_SHALLOW = 'Shallow knowledge',
}

export enum DEV_SENIORITY_FIELDS {
  NAME = 'Name',
}

export enum DEV_CATEGORY_FIELDS {
  NAME = 'Name',
  COLOR = 'Color',
}

export enum DEV_SKILL_FIELDS {
  NAME = 'Name',
  COLOR = 'Color (from Categories copy)',
  CATEGORY_ID = 'RecordID (from Categories copy)',
}

export enum DEV_BASE_VIEWS {
  RESULTS = 'Results',
  GRID_VIEW = 'Grid view',
  GRID = 'Grid',
  ALL = 'All',
}
