import { useIntl } from 'react-intl';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { Dispatch, SetStateAction } from 'react';
import { Draggable, Droppable } from '../../../dnd';
import { Skills } from '../../knowledgeForm/useKnowledgeForm.hook';
import { SkillTag } from '../../skillTag';
import { ValueBox } from '../../valueBox';
import { DnDInfoContent } from '../../dndInfoContent/dndInfoContent.component';
import knowledgeFormMessages from '../knowledgeForm.messages';
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
  const intl = useIntl();

  const renderSkills = (type: keyof Skills) =>
    skills[type]
      .filter((skill) => skill.isVisible)
      .map(({ color, label, value }) => (
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
        <ValueBox
          label={intl.formatMessage(knowledgeFormMessages.skillsToChoose)}
          isLoading={isLoading}
          maxContentHeight="250px"
          infoContent={<DnDInfoContent type="root" />}
          withoutOverflow={Boolean(activeItem)}
        >
          {skills.root.map(({ color, label, value }) => (
            <Draggable key={value} id={value} data={{ color, label, value }}>
              <SkillTag color={color} name={label} />
            </Draggable>
          ))}
        </ValueBox>
      </Droppable>

      <BoxesContainer>
        <Droppable id={DND_CONTAINER_ID.EXPERT}>
          <ValueBox
            label={intl.formatMessage(knowledgeFormMessages.expertLabel)}
            isLoading={isLoading}
            infoContent={<DnDInfoContent type="expert" />}
          >
            {renderSkills('expert')}
          </ValueBox>
        </Droppable>

        <Droppable id={DND_CONTAINER_ID.INTERMEDIATE}>
          <ValueBox
            label={intl.formatMessage(knowledgeFormMessages.intermediateLabel)}
            isLoading={isLoading}
            infoContent={<DnDInfoContent type="intermediate" />}
          >
            {renderSkills('intermediate')}
          </ValueBox>
        </Droppable>

        <Droppable id={DND_CONTAINER_ID.SHALLOW}>
          <ValueBox
            label={intl.formatMessage(knowledgeFormMessages.shallowLabel)}
            isLoading={isLoading}
            infoContent={<DnDInfoContent type="shallow" />}
          >
            {renderSkills('shallow')}
          </ValueBox>
        </Droppable>
      </BoxesContainer>
      <DragOverlay>{activeItem ? <SkillTag color={activeItem.color} name={activeItem.label} /> : null}</DragOverlay>
    </DndContext>
  );
};
