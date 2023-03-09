import styled from 'styled-components';
import { Button } from '../../button';

export const NextButton = styled(Button)`
  align-self: flex-start;
  margin-top: 40px;
  position: relative;
  z-index: 1;
`;

export const Form = styled.form`
  max-width: 722px;
  display: flex;
  flex-direction: column;
`;

export const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
`;
