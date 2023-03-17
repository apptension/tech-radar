export interface PersonalInfo {
  position: string;
  slackId: string;
  email: string;
  name: string;
  seniority: string;
}

export interface AdditionalInfo {
  additionalSkills: '';
  likeToLearn: '';
}

export interface SelectOption {
  value: string;
  label: string;
}

export type Seniority = SelectOption;

export type Position = SelectOption;

export type Category = SelectOption & { color: string };

export type Skill = SelectOption & { color: string; categoryId: string };

export type SkillWithVisibility = Skill & {
  isVisible?: boolean;
};
