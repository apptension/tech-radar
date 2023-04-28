import { useIntl } from 'react-intl';
import { MatrixSelectField } from '../../fields/matrixSelectField';
import { OptionWithColor } from '../../fields/matrixSelectField/OptionWithColor';
import { SingleValueWithColor } from '../../fields/matrixSelectField/SingleValueWithColor';
import { MatrixTextField } from '../../fields/matrixTextField';
import { FormActions } from '../formActions';
import { FieldsRow, FieldContainer, Form } from './knowledgeForm.styles';
import { SkillsDnd } from './skillsDnD/skillsDnD.component';
import { useKnowledgeForm } from './useKnowledgeForm.hook';
import knowledgeFormMessages from './knowledgeForm.messages';

export const KnowledgeForm = () => {
  const {
    skills,
    categoryOptions,
    isSearching,
    isSubmitDisabled,
    setSkills,
    search,
    selectedCategory,
    isEditMode,
    cancelEdit,
    submit,
    handleCategoryChange,
    goBack,
    handleSearchChange,
  } = useKnowledgeForm();

  const intl = useIntl();

  return (
    <Form onSubmit={submit}>
      <FieldsRow>
        <FieldContainer>
          <MatrixSelectField
            label=""
            options={categoryOptions}
            value={categoryOptions.find((option) => option.value === selectedCategory)}
            components={{ Option: OptionWithColor, SingleValue: SingleValueWithColor }}
            onChange={handleCategoryChange}
          />
        </FieldContainer>
        <FieldContainer>
          <MatrixTextField
            label=""
            icon="search"
            placeholder={intl.formatMessage(knowledgeFormMessages.search)}
            value={search}
            onChange={handleSearchChange}
            onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
          />
        </FieldContainer>
      </FieldsRow>

      <SkillsDnd isLoading={isSearching} skills={skills} setSkills={setSkills} />

      <FormActions
        handleGoBack={isEditMode ? cancelEdit : goBack}
        isEditMode={isEditMode}
        isDisabled={isSubmitDisabled}
      />
    </Form>
  );
};
