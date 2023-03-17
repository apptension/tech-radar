import { MatrixHeader } from '../../../shared/components/matrix/matrixHeader';
import { StepInfo } from '../../../shared/components/matrix/stepInfo';
import { MainContainer, Pattern, PatternContainer } from '../matrix.styles';
import { OverviewForm } from '../../../shared/components/matrix/overviewForm';

export const Overview = () => {
  return (
    <main>
      <MatrixHeader />
      <MainContainer>
        <StepInfo step={4} />

        <OverviewForm />

        <PatternContainer>
          <Pattern />
        </PatternContainer>
      </MainContainer>
    </main>
  );
};
