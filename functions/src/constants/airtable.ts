export enum BASE {
  USERS = 'tblljrHCnb1MCdaOh',
  SENIORITIES = 'tblazoEO9BXeMbQXj',
  POSITIONS = 'tblsP5T9GCsA1TLa9',
  CATEGORIES = 'tblLkeJQv3DCrll3z',
  SKILLS = 'tblKCffPPVutA2N8n',
}

export enum USER_FIELDS {
  NAME = 'Name',
  POSITION = 'Position1',
  EMAIL = 'Email',
  SLACK_ID = 'SlackID',
  SENIORITY = 'Seniority',
}

export enum SENIORITY_FIELDS {
  NAME = 'Name',
}

export enum CATEGORY_FIELDS {
  NAME = 'Name',
  COLOR = 'Color',
}

export enum SKILL_FIELDS {
  NAME = 'Name',
  COLOR = 'Color (from Categories copy)',
  CATEGORY_ID = 'RecordID (from Categories copy)',
}

export enum BASE_VIEWS {
  RESULTS = 'Results',
  GRID_VIEW = 'Grid view',
  GRID = 'Grid',
  ALL = 'All',
}