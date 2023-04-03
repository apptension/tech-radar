export enum PROD_BASE {
  USERS = 'tbljqi6FiiawlkUu3',
  SENIORITIES = 'tblazoEO9BXeMbQXj',
  POSITIONS = 'tblsP5T9GCsA1TLa9',
  CATEGORIES = 'tblkDZMCUdXXz6bxS',
  SKILLS = 'tbl3efvbmjAFjkF63',
}

export enum PROD_USER_FIELDS {
  NAME = 'Name',
  POSITION = 'Position',
  LAST_SUBMIT = 'Submit Date',
  EMAIL = 'Email',
  SLACK_ID = 'Slack Member ID',
  SENIORITY = 'Seniority',
  SUBMIT_DATE = 'Submit Date',
  ADDITIONAL_SKILLS = 'Not recorded',
  LIKE_TO_LEARN = 'Willing to learn',
  SKILLS_EXPERT = 'Expert knowledge',
  SKILLS_INTERMEDIATE = 'Intermediate knowledge',
  SKILLS_SHALLOW = 'Shallow knowledge',
}

export enum PROD_SENIORITY_FIELDS {
  NAME = 'Name',
}

export enum PROD_CATEGORY_FIELDS {
  NAME = 'Name',
  COLOR = 'Color',
}

export enum PROD_SKILL_FIELDS {
  NAME = 'Name',
  COLOR = 'Color (from Categories)',
  CATEGORY_ID = 'RecordID (from Categories)',
}

export enum PROD_BASE_VIEWS {
  RESULTS = 'Results',
  GRID_VIEW = 'Grid view',
  GRID = 'Grid',
  ALL = 'All',
}
