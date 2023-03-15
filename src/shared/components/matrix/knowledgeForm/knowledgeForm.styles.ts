import styled from 'styled-components';
import { Button } from '../../button';

export const ActionsContainer = styled.div`
  margin-top: 60px;
  display: flex;
  gap: 40px;
`;

export const NextButton = styled(Button)`
  align-self: flex-start;
  position: relative;
  z-index: 1;
`;

export const Form = styled.form`
  max-width: 1680px;
  width: 95%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

export const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
  width: 100%;
  max-width: 530px;
`;

export const FieldsRow = styled.div`
  display: flex;
  gap: 31px;
  width: 100%;
`;

export const DraggableContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;
