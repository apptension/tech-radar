import styled from 'styled-components';
import { color } from '../../../theme';
import { ReactComponent as PatternSVG } from '../../../images/matrix-form-pattern-2.svg';

export const MainContainer = styled.div`
  background-color: ${color};
  padding: 120px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 129px;
`;

export const PatternContainer = styled.div`
  position: fixed;
  bottom: 117px;
  left: 0;
  right: 0;
  z-index: -1;
`;

export const Pattern = styled(PatternSVG)`
  width: 100%;
`;
