import styled from 'styled-components';
import { ReactComponent as PatternSVG } from '../../../images/matrix-form-pattern.svg';

export const PersonalPatternContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
`;

export const PersonalPattern = styled(PatternSVG)`
  width: 100%;
`;
