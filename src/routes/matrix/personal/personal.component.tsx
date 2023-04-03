import { PersonalInfoForm } from '../../../shared/components/matrix/personalInfoForm';
import { MatrixHeader } from '../../../shared/components/matrix/matrixHeader';
import { StepInfo } from '../../../shared/components/matrix/stepInfo';
import { MainContainer } from '../matrix.styles';
import { PersonalPattern, PersonalPatternContainer } from './personal.styles';

export const Personal = () => {
  return (
    <main>
      <MatrixHeader />
      <MainContainer>
        <StepInfo step={1} />

        <PersonalInfoForm />

        <PersonalPatternContainer>
          <PersonalPattern />
        </PersonalPatternContainer>
      </MainContainer>
    </main>
  );
};
