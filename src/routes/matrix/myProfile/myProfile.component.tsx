import { useIntl } from 'react-intl';
import { MatrixHeader } from '../../../shared/components/matrix/matrixHeader';
import { MyProfileForm } from '../../../shared/components/matrix/myProfileForm';
import { TitleHeader } from '../../../shared/components/matrix/titleHeader';
import { MainContainer, Pattern, PatternContainer } from '../matrix.styles';
import myProfileMessages from './myProfile.messages';

export const MyProfile = () => {
  const intl = useIntl();

  return (
    <main>
      <MatrixHeader />
      <MainContainer>
        <TitleHeader
          title={intl.formatMessage(myProfileMessages.title)}
          content={intl.formatMessage(myProfileMessages.dataIsCorrect, { br: <br /> })}
        />

        <MyProfileForm />

        <PatternContainer>
          <Pattern />
        </PatternContainer>
      </MainContainer>
    </main>
  );
};
