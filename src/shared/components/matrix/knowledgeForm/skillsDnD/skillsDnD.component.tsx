import { DndContext, DragOverlay } from '@dnd-kit/core';
import { Dispatch, SetStateAction } from 'react';
import { Draggable, Droppable } from '../../../dnd';
import {
  AVAILABLE_SKILLS_INFO_TEXT,
  EXPERT_INFO_TEXT,
  INTERMEDIATE_INFO_TEXT,
  SHALLOW_INFO_TEXT,
} from '../../knowledgeForm/knowledgeForm.constants';
import { Skills } from '../../knowledgeForm/useKnowledgeForm.hook';
import { SkillTag } from '../../skillTag';
import { ValueBox } from '../../valueBox';
import { BoxesContainer } from './skillsDnD.styles';
import { useSkillsDnd } from './useSkillsDnd.hook';

enum DND_CONTAINER_ID {
  ROOT = 'root',
  EXPERT = 'expert',
  INTERMEDIATE = 'intermediate',
  SHALLOW = 'shallow',
}

interface SkillsDndProps {
  skills: Skills;
  setSkills: Dispatch<SetStateAction<Skills>>;
  isLoading: boolean;
}

export const SkillsDnd = ({ skills, setSkills, isLoading }: SkillsDndProps) => {
  const { activeItem, handleDragEnd, handleDragStart, handleRemoveSkill, sensors } = useSkillsDnd({
    skills,
    setSkills,
  });

  const renderSkills = (type: keyof Skills) =>
    skills[type].map(({ color, label, value }) => (
      <Draggable key={value} id={value} data={{ color, label, value }}>
        <SkillTag
          color={color}
          name={label}
          {...(type !== 'root' && { onRemove: () => handleRemoveSkill(type, value) })}
        />
      </Draggable>
    ));

  return (
    <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart} sensors={sensors}>
      <Droppable id={DND_CONTAINER_ID.ROOT}>
        <ValueBox label="Skills to choose from" isLoading={isLoading} infoContent={AVAILABLE_SKILLS_INFO_TEXT}>
          {renderSkills('root')}
        </ValueBox>
      </Droppable>

      <BoxesContainer>
        <Droppable id={DND_CONTAINER_ID.EXPERT}>
          <ValueBox label="Expert" infoContent={EXPERT_INFO_TEXT}>
            {renderSkills('expert')}
          </ValueBox>
        </Droppable>

        <Droppable id={DND_CONTAINER_ID.INTERMEDIATE}>
          <ValueBox label="Intermediate" infoContent={INTERMEDIATE_INFO_TEXT}>
            {renderSkills('intermediate')}
          </ValueBox>
        </Droppable>

        <Droppable id={DND_CONTAINER_ID.SHALLOW}>
          <ValueBox label="Shallow" infoContent={SHALLOW_INFO_TEXT}>
            {renderSkills('shallow')}
          </ValueBox>
        </Droppable>
      </BoxesContainer>
      <DragOverlay>{activeItem ? <SkillTag color={activeItem.color} name={activeItem.label} /> : null}</DragOverlay>
    </DndContext>
  );
};
