import { AdditionalInfoForm } from '../../../shared/components/matrix/additionalInfoForm';
import { MatrixHeader } from '../../../shared/components/matrix/matrixHeader';
import { StepInfo } from '../../../shared/components/matrix/stepInfo';
import { MainContainer, Pattern, PatternContainer } from '../matrix.styles';

export const AdditionalInfo = () => {
  return (
    <main>
      <MatrixHeader />
      <MainContainer>
        <StepInfo step={3} />

        <AdditionalInfoForm />

        <PatternContainer>
          <Pattern />
        </PatternContainer>
      </MainContainer>
    </main>
  );
};
