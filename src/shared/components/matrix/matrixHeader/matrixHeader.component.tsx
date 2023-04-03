import { Link } from 'react-router-dom';
import matrixLogo from '../../../../images/matrix-logo.png';
import { ROUTES } from '../../../../routes/app.constants';

import { AvatarWithSettings } from '../avatarWithSettings';
import { Header, Photo } from './matrixHeader.styles';

export const MatrixHeader = () => {
  return (
    <Header>
      <Link to={ROUTES.matrixPersonal}>
        <Photo src={matrixLogo} />
      </Link>
      <AvatarWithSettings />
    </Header>
  );
};
