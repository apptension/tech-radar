import { MatrixSelectField } from '../../fields/matrixSelectField';
import { OptionWithColor } from '../../fields/matrixSelectField/OptionWithColor';
import { SingleValueWithColor } from '../../fields/matrixSelectField/SingleValueWithColor';
import { MatrixTextField } from '../../fields/matrixTextField';
import { FormActions } from '../formActions';
import { FieldsRow, FieldContainer, Form } from './knowledgeForm.styles';
import { SkillsDnd } from './skillsDnD/skillsDnD.component';
import { useKnowledgeForm } from './useKnowledgeForm.hook';

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
          <MatrixTextField label="" icon="search" placeholder="Search" value={search} onChange={handleSearchChange} />
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
