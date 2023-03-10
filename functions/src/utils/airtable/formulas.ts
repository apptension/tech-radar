import { SKILL_FIELDS, USER_FIELDS } from '../../constants/airtable';

export const filterUserByEmailFormula = (email: string) => {
  return `${USER_FIELDS.EMAIL} = "${email}"`;
};

export const filterSkilsByCategoryId = (categoryId: string) => {
  return `IF({${SKILL_FIELDS.CATEGORY_ID}} & "" = "${categoryId}", 'TRUE', 'FALSE')`;
};

export const filterSkillsBySearch = (search: string) => {
  return `SEARCH(LOWER("${search}"), LOWER(${SKILL_FIELDS.NAME}))`;
};