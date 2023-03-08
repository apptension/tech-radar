export interface PersonalInfo {
  position: string;
  slackId: string;
  email: string;
  name: string;
  seniority: string;
}

export interface SelectOption {
  value: string;
  label: string;
}

export type Seniority = SelectOption;
