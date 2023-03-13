import { USER_FIELDS } from '../../constants/airtable';

export const getUserByEmailFormula = (email: string) => {
  return `${USER_FIELDS.EMAIL} = "${email}"`;
};
