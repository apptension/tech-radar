import { MatrixHeader } from '../../../shared/components/matrix/matrixHeader';
import { MyProfileForm } from '../../../shared/components/matrix/myProfileForm';
import { TitleHeader } from '../../../shared/components/matrix/titleHeader';
import { MainContainer, Pattern, PatternContainer } from '../matrix.styles';

export const MyProfile = () => {
  return (
    <main>
      <MatrixHeader />
      <MainContainer>
        <TitleHeader
          title="My profile"
          content={`Please, make sure your personal data is correct.\nIt will be used for internal purpose only.`}
        />

        <MyProfileForm />

        <PatternContainer>
          <Pattern />
        </PatternContainer>
      </MainContainer>
    </main>
  );
};
