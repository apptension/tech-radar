import { FormActions } from '../formActions';
import { Textarea } from '../additionalInfoForm/additionalInfoForm.styles';
import { ReactComponent as EditSVG } from '../../../../images/icons/edit.svg';
import { ValueBox } from '../valueBox';
import { SkillTag } from '../skillTag';
import {
  ADDITIONAL_SKILLS_INFO_TEXT,
  LIKE_TO_LEARN_INFO_TEXT,
} from '../additionalInfoForm/additionalInfoForm.constants';
import { DnDInfoContent } from '../dndInfoContent';
import {
  BoxesContainer,
  EditButton,
  Form,
  SectionContainer,
  SectionHeader,
  SectionTitle,
  TextValueBox,
} from './overviewForm.styles';
import { useOverviewForm } from './useOverviewForm.hook';

export const OverviewForm = () => {
  const { skills, additionalInfoData, isLoading, goBack, editAdditionalInfoStep, editKnowledgeStep, submit } =
    useOverviewForm();

  return (
    <Form onSubmit={submit}>
      <SectionContainer>
        <SectionHeader>
          <SectionTitle>Knowledge expertise</SectionTitle>
          <EditButton onClick={editKnowledgeStep}>
            <EditSVG />
          </EditButton>
        </SectionHeader>

        <BoxesContainer>
          <ValueBox maxContentHeight="300px" label="Expert" infoContent={<DnDInfoContent type="expert" />}>
            {skills.expert.map(({ color, label, value }) => (
              <SkillTag key={value} color={color} name={label} />
            ))}
          </ValueBox>

          <ValueBox maxContentHeight="300px" label="Intermediate" infoContent={<DnDInfoContent type="intermediate" />}>
            {skills.intermediate.map(({ color, label, value }) => (
              <SkillTag key={value} color={color} name={label} />
            ))}
          </ValueBox>

          <ValueBox maxContentHeight="300px" label="Shallow" infoContent={<DnDInfoContent type="shallow" />}>
            {skills.shallow.map(({ color, label, value }) => (
              <SkillTag key={value} color={color} name={label} />
            ))}
          </ValueBox>
        </BoxesContainer>
      </SectionContainer>

      <SectionContainer>
        <SectionHeader>
          <SectionTitle>Additional information</SectionTitle>
          <EditButton onClick={editAdditionalInfoStep}>
            <EditSVG />
          </EditButton>
        </SectionHeader>

        <BoxesContainer>
          <TextValueBox
            maxWidth="720px"
            maxContentHeight="190px"
            label="Additional skills"
            infoContent={ADDITIONAL_SKILLS_INFO_TEXT}
          >
            <Textarea disabled defaultValue={additionalInfoData.additionalSkills} />
          </TextValueBox>

          <TextValueBox
            maxWidth="720px"
            maxContentHeight="190px"
            label="I would like to learn"
            infoContent={LIKE_TO_LEARN_INFO_TEXT}
          >
            <Textarea disabled defaultValue={additionalInfoData.likeToLearn} />
          </TextValueBox>
        </BoxesContainer>
      </SectionContainer>

      <FormActions handleGoBack={goBack} nextLabel="Submit" isLoading={isLoading} />
    </Form>
  );
};
