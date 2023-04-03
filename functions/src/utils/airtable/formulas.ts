import { AIRTABLE_FIELDS } from '../../constants/airtable';

export const filterUserByEmailFormula = (email: string) => {
  return `${AIRTABLE_FIELDS.USER_FIELDS.EMAIL} = "${email}"`;
};

export const filterSkilsByCategoryId = (categoryId: string) => {
  return `{${AIRTABLE_FIELDS.SKILL_FIELDS.CATEGORY_ID}} & "" = "${categoryId}"`;
};

export const filterSkillsBySearch = (search: string) => {
  return `SEARCH(LOWER("${search}"), LOWER(${AIRTABLE_FIELDS.SKILL_FIELDS.NAME}))`;
};
