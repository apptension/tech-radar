import { Skill } from '../types';

export const checkIfSkillIsAdded = (skills: Skill[], skillValue: string) =>
  skillValue !== skills.find((item) => item.value === skillValue)?.value;

export const findSkill = (skillValue: string, skills: Skill[]) => {
  return skills.find((skill) => skill.value === skillValue) as Skill;
};

export const mapSkillToSkillWithVisibility = (skill: Skill) => ({ ...skill, isVisible: true });

export const getUserSkillsFromIds = (skillIds: string[], skills: Skill[]) =>
  skillIds.map((skillId) => {
    const skill = findSkill(skillId, skills);
    return mapSkillToSkillWithVisibility(skill);
  });

export const mapSkillsToValues = (skills: Skill[]) => skills.map(({ value }) => value);
