import { Button } from '../../button';
import { ButtonSize, ButtonVariant } from '../../button/button.types';
import { MatrixSelectField } from '../../fields/matrixSelectField';
import { OptionWithColor } from '../../fields/matrixSelectField/OptionWithColor';
import { SingleValueWithColor } from '../../fields/matrixSelectField/SingleValueWithColor';

import { MatrixTextField } from '../../fields/matrixTextField';
import { Loader } from '../../loader';
import { SkillTag } from '../skillTag';
import { ValueBox } from '../valueBox';
import {
  Form,
  NextButton,
  FieldContainer,
  FieldsRow,
  DraggableContainer,
  ActionsContainer,
} from './knowledgeForm.styles';
import { useKnowledgeForm } from './useKnowledgeForm.hook';

export const KnowledgeForm = () => {
  const { skills, categoryOptions, isLoading, search, selectedCategory, setSearch, setSelectedCategory, handleBack } =
    useKnowledgeForm();

  if (isLoading) {
    return <Loader isFullPage />;
  }

  return (
    <Form>
      <FieldsRow>
        <FieldContainer>
          <MatrixSelectField
            label=""
            options={categoryOptions}
            value={categoryOptions.find((option) => option.value === selectedCategory)}
            components={{ Option: OptionWithColor, SingleValue: SingleValueWithColor }}
            onChange={(val: any) => setSelectedCategory(val.value)}
          />
        </FieldContainer>
        <FieldContainer>
          <MatrixTextField
            label=""
            icon="search"
            placeholder="Search"
            value={search}
            onChange={({ target }) => setSearch(target.value)}
          />
        </FieldContainer>
      </FieldsRow>
      <ValueBox
        label="Skills to choose from"
        infoContent="Choose any tag with technology and move it to the Expertise level you feel it can be referred to.
        You can also move all tags from one level to another. 
        Don't worry, if there's something you don't find in the list, you can add it in the next “Step 3” under “Additional skills”."
      >
        <DraggableContainer>
          {skills.map(({ label, value, color }) => (
            <SkillTag key={value} name={label} color={color} />
          ))}
        </DraggableContainer>
      </ValueBox>

      <ActionsContainer>
        <Button type="button" size={ButtonSize.LARGE} onClick={handleBack}>
          Back
        </Button>
        <NextButton type="submit" size={ButtonSize.LARGE} variant={ButtonVariant.PRIMARY}>
          Next
        </NextButton>
      </ActionsContainer>
    </Form>
  );
};
