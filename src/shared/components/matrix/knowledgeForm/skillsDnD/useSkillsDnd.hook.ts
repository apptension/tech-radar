import { DragEndEvent, DragStartEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { Dispatch, SetStateAction, useState } from 'react';
import { Skill } from '../../types';
import { Skills } from '../useKnowledgeForm.hook';
import { findActiveItemContainer, findOverContainer, sortSkillsAlph } from './skillsDnd.utils';

interface UseSkillsDndProps {
  skills: Skills;
  setSkills: Dispatch<SetStateAction<Skills>>;
}

export const useSkillsDnd = ({ setSkills, skills }: UseSkillsDndProps) => {
  const [activeItem, setActiveItem] = useState<Skill | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 4,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    // event.active.data.current contains Skill data that we're passing to activeItem state
    if (event.active.data.current) {
      const { color, label, value } = event.active.data.current;
      setActiveItem({ color, label, value });
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const oldContainerName = findActiveItemContainer(event.active.id, skills);
    const newContainerName = findOverContainer(event.over?.id || '', skills);

    if (!oldContainerName || !newContainerName || oldContainerName === newContainerName) {
      return;
    }

    const activeItem = skills[oldContainerName].find((item) => item.value === event.active.id);

    if (activeItem) {
      const updatedOldCategory = skills[oldContainerName].filter((item) => item.value !== event.active.id);
      const updatedNewCategory = [...skills[newContainerName], activeItem];

      setSkills((skills) => ({
        ...skills,
        [oldContainerName]: [...sortSkillsAlph(updatedOldCategory)],
        [newContainerName]: [...sortSkillsAlph(updatedNewCategory)],
      }));
    }
    setActiveItem(null);
  };

  const handleRemoveSkill = (type: keyof Skills, skillToRemoveId: string) => {
    const skillToRemove = skills[type].find(({ value }) => value === skillToRemoveId);

    setSkills((skills) => ({
      ...skills,
      [type]: skills[type].filter(({ value }) => value !== skillToRemoveId),
      root: sortSkillsAlph([...skills.root, skillToRemove!]),
    }));
  };

  return { activeItem, sensors, handleDragEnd, handleDragStart, handleRemoveSkill };
};
