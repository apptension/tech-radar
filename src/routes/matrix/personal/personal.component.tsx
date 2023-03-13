import { PersonalInfoForm } from '../../../shared/components/matrix/personalInfoForm';
import { MatrixHeader } from '../../../shared/components/matrix/matrixHeader';
import { FormProgress } from '../../../shared/components/matrix/formProgress';
import { MainContainer, InfoText, Pattern, PatternContainer, Title, Header, TitleContainer } from './personal.styles';

export const Personal = () => {
  return (
    <main>
      <MatrixHeader />
      <MainContainer>
        <Header>
          <FormProgress step={1} />

          <TitleContainer>
            <Title>Step 1: Personal information</Title>
            <InfoText>Please, make sure your personal data is correct.</InfoText>
            <InfoText> It will be used for internal purpose only.</InfoText>
          </TitleContainer>
        </Header>

        <PersonalInfoForm />

        <PatternContainer>
          <Pattern />
        </PatternContainer>
      </MainContainer>
    </main>
  );
};
