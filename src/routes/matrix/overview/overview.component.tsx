import { MatrixHeader } from '../../../shared/components/matrix/matrixHeader';
import { StepInfo } from '../../../shared/components/matrix/stepInfo';
import { MainContainer } from '../matrix.styles';

export const Overview = () => {
  return (
    <main>
      <MatrixHeader />
      <MainContainer>
        <StepInfo step={4} />
      </MainContainer>
    </main>
  );
};
