import { PersonalInfoForm } from '../../../shared/components/matrix/personalInfoForm';
import { MatrixHeader } from '../../../shared/components/matrix/matrixHeader';
import { MainContainer, InfoText, Pattern, PatternContainer, Title, Header } from './personal.styles';

export const Personal = () => {
  return (
    <main>
      <MatrixHeader />
      <MainContainer>
        <Header>
          <Title>Step 1: Personal information</Title>
          <InfoText>Please, make sure your personal data is correct.</InfoText>
          <InfoText> It will be used for internal purpose only.</InfoText>
        </Header>

        <PersonalInfoForm />

        <PatternContainer>
          <Pattern />
        </PatternContainer>
      </MainContainer>
    </main>
  );
};
