import { useIntl } from 'react-intl';
import { FormActions } from '../formActions';
import { Textarea } from '../additionalInfoForm/additionalInfoForm.styles';
import { ReactComponent as EditSVG } from '../../../../images/icons/edit.svg';
import { ValueBox } from '../valueBox';
import { SkillTag } from '../skillTag';
import additionalInfoMessages from '../additionalInfoForm/additionalInfoForm.messages';

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
import overviewFormMessages from './overviewForm.messages';

export const OverviewForm = () => {
  const { skills, additionalInfoData, isLoading, goBack, editAdditionalInfoStep, editKnowledgeStep, submit } =
    useOverviewForm();
  const intl = useIntl();

  return (
    <Form onSubmit={submit}>
      <SectionContainer>
        <SectionHeader>
          <SectionTitle>{intl.formatMessage(overviewFormMessages.knowledgeExpertise)}</SectionTitle>
          <EditButton onClick={editKnowledgeStep}>
            <EditSVG />
          </EditButton>
        </SectionHeader>

        <BoxesContainer>
          <ValueBox
            maxContentHeight="300px"
            label={intl.formatMessage(overviewFormMessages.expertLabel)}
            infoContent={<DnDInfoContent type="expert" />}
          >
            {skills.expert.map(({ color, label, value }) => (
              <SkillTag key={value} color={color} name={label} />
            ))}
          </ValueBox>

          <ValueBox
            maxContentHeight="300px"
            label={intl.formatMessage(overviewFormMessages.intermediateLabel)}
            infoContent={<DnDInfoContent type="intermediate" />}
          >
            {skills.intermediate.map(({ color, label, value }) => (
              <SkillTag key={value} color={color} name={label} />
            ))}
          </ValueBox>

          <ValueBox
            maxContentHeight="300px"
            label={intl.formatMessage(overviewFormMessages.shallowLabel)}
            infoContent={<DnDInfoContent type="shallow" />}
          >
            {skills.shallow.map(({ color, label, value }) => (
              <SkillTag key={value} color={color} name={label} />
            ))}
          </ValueBox>
        </BoxesContainer>
      </SectionContainer>

      <SectionContainer>
        <SectionHeader>
          <SectionTitle>{intl.formatMessage(overviewFormMessages.additionalInformation)}</SectionTitle>
          <EditButton onClick={editAdditionalInfoStep}>
            <EditSVG />
          </EditButton>
        </SectionHeader>

        <BoxesContainer>
          <TextValueBox
            maxWidth="720px"
            maxContentHeight="190px"
            label={intl.formatMessage(additionalInfoMessages.skills)}
            infoContent={intl.formatMessage(additionalInfoMessages.skillsInfo)}
          >
            <Textarea disabled defaultValue={additionalInfoData.additionalSkills} />
          </TextValueBox>

          <TextValueBox
            maxWidth="720px"
            maxContentHeight="190px"
            label={intl.formatMessage(additionalInfoMessages.likeToLearn)}
            infoContent={intl.formatMessage(additionalInfoMessages.likeToLearnInfo)}
          >
            <Textarea disabled defaultValue={additionalInfoData.likeToLearn} />
          </TextValueBox>
        </BoxesContainer>
      </SectionContainer>

      <FormActions
        handleGoBack={goBack}
        nextLabel={intl.formatMessage(overviewFormMessages.submitLabel)}
        isLoading={isLoading}
      />
    </Form>
  );
};
