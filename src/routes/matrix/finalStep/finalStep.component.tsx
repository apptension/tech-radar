import { useIntl } from 'react-intl';
import { ButtonIcon, ButtonSize, ButtonVariant } from '../../../shared/components/button/button.types';
import { Link } from '../../../shared/components/link';
import { MatrixHeader } from '../../../shared/components/matrix/matrixHeader';
import { StepInfo } from '../../../shared/components/matrix/stepInfo';
import { ROUTES } from '../../app.constants';
import { MainContainer } from '../matrix.styles';
import finalStepMessages from './finalStep.messages';
import { ActionsContainer, Radar, RadarContainer } from './finalStep.styles';

export const FinalStep = () => {
  const intl = useIntl();

  return (
    <main>
      <MatrixHeader />
      <MainContainer>
        <StepInfo step={5} />

        <ActionsContainer>
          <Link to={ROUTES.matrixPersonal} size={ButtonSize.LARGE}>
            {intl.formatMessage(finalStepMessages.backToMatrix)}
          </Link>
          <Link to={ROUTES.explore} size={ButtonSize.LARGE} variant={ButtonVariant.PRIMARY} icon={ButtonIcon.ARROW}>
            {intl.formatMessage(finalStepMessages.checkRadar)}
          </Link>
        </ActionsContainer>

        <RadarContainer>
          <Radar />
        </RadarContainer>
      </MainContainer>
    </main>
  );
};
