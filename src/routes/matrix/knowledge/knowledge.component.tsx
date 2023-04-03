import { KnowledgeForm } from '../../../shared/components/matrix/knowledgeForm';
import { MatrixHeader } from '../../../shared/components/matrix/matrixHeader';
import { StepInfo } from '../../../shared/components/matrix/stepInfo';
import { MainContainer, Pattern, PatternContainer } from '../matrix.styles';

export const Knowledge = () => {
  return (
    <main>
      <MatrixHeader />
      <MainContainer>
        <StepInfo step={2} />

        <KnowledgeForm />

        <PatternContainer>
          <Pattern />
        </PatternContainer>
      </MainContainer>
    </main>
  );
};
