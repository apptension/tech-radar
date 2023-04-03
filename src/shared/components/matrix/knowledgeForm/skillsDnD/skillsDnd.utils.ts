import { DragEndEvent } from '@dnd-kit/core';
import { Skill } from '../../types';
import { Skills } from '../useKnowledgeForm.hook';

export const findActiveItemContainer = (skillId: DragEndEvent['active']['id'], skills: Skills) => {
  return (Object.keys(skills) as Array<keyof Skills>).find((key) => skills[key].find(({ value }) => value === skillId));
};

export const findOverContainer = (categoryId: DragEndEvent['active']['id'], skills: Skills) => {
  if (categoryId in skills) {
    return categoryId as keyof Skills;
  }
};

export const sortSkillsAlph = (skills: Skill[]) =>
  skills.sort((a: Skill, b: Skill) => (a.label < b.label ? -1 : a.label > b.label ? 1 : 0));
