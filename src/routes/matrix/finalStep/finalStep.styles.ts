import styled from 'styled-components';
import { ReactComponent as RadarSVG } from '../../../images/matrix-radar.svg';

export const RadarContainer = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: -5;
`;

export const Radar = styled(RadarSVG)`
  width: 100%;
`;

export const ActionsContainer = styled.div`
  display: flex;
  gap: 40px;
`;
