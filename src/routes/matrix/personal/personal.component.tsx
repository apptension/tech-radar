import { PersonalInfoForm } from '../../../shared/components/matrix/personalInfoForm';
import { MatrixHeader } from '../../../shared/components/matrix/matrixHeader';
import { StepInfo } from '../../../shared/components/matrix/stepInfo';
import { MainContainer, Pattern, PatternContainer } from './personal.styles';

export const Personal = () => {
  return (
    <main>
      <MatrixHeader />
      <MainContainer>
        <StepInfo step={1} />

        <PersonalInfoForm />

        <PatternContainer>
          <Pattern />
        </PatternContainer>
      </MainContainer>
    </main>
  );
};
