import styled from 'styled-components';
import { color, scrollbar } from '../../../../theme';
import { H1small } from '../../../../theme/typography';
import { ValueBox } from '../valueBox';

export const Form = styled.form`
  max-width: 720px;
`;

export const Textarea = styled.textarea`
  ${scrollbar.customScrollbar};
  ${H1small};
  width: 100%;
  height: 100%;
  background-color: transparent;
  border: none;
  resize: none;
  color: ${color.white};
  caret-color: ${color.schoolBusYellow};
  padding-right: 20px;

  &:focus {
    outline: none;
  }
`;

export const TextAreasContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

export const StyledValueBox = styled(ValueBox)`
  padding-right: 0 !important;
  padding-bottom: 10px !important;
`;
