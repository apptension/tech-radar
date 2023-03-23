import { ButtonIcon, ButtonSize, ButtonVariant } from '../../../shared/components/button/button.types';
import { Link } from '../../../shared/components/link';
import { MatrixHeader } from '../../../shared/components/matrix/matrixHeader';
import { StepInfo } from '../../../shared/components/matrix/stepInfo';
import { ROUTES } from '../../app.constants';
import { MainContainer } from '../matrix.styles';
import { ActionsContainer, Radar, RadarContainer } from './finalStep.styles';

export const FinalStep = () => {
  return (
    <main>
      <MatrixHeader />
      <MainContainer>
        <StepInfo step={5} />

        <ActionsContainer>
          <Link to={ROUTES.matrixPersonal} size={ButtonSize.LARGE}>
            Back to Skills Matrix
          </Link>
          <Link to={ROUTES.explore} size={ButtonSize.LARGE} variant={ButtonVariant.PRIMARY} icon={ButtonIcon.ARROW}>
            Check our Tech Radar
          </Link>
        </ActionsContainer>

        <RadarContainer>
          <Radar />
        </RadarContainer>
      </MainContainer>
    </main>
  );
};
