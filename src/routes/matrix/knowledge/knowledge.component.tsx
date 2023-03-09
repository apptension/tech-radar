import { MatrixHeader } from '../../../shared/components/matrix/matrixHeader';
import { StepInfo } from '../../../shared/components/matrix/stepInfo';
import { MainContainer, Pattern, PatternContainer } from './knowledge.styles';

export const Knowledge = () => {
  return (
    <main>
      <MatrixHeader />
      <MainContainer>
        <StepInfo step={2} />

        <PatternContainer>
          <Pattern />
        </PatternContainer>
      </MainContainer>
    </main>
  );
};
