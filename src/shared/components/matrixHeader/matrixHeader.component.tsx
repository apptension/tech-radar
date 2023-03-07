import matrixLogo from '../../../images/matrix-logo.png';
import { Header, Photo } from './matrixHeader.styles';

export const MatrixHeader = () => {
  return (
    <Header>
      <Photo src={matrixLogo} />
    </Header>
  );
};
