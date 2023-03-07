import styled, { css } from 'styled-components';
import { color, fontWeight } from '../../../../theme';
import { H1small, LabelMedium } from '../../../../theme/typography';

interface InputProps {
  isError: boolean;
  isDisabled: boolean;
}

interface LabelProps {
  isRequired: boolean;
}

const FIELD_HEIGHT = '60px';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const StyledInput = styled.input<InputProps>`
  ${H1small};
  height: ${FIELD_HEIGHT};
  background-color: ${color.codGray};
  padding: 16px 24px;
  color: ${color.white};
  border: 1px solid ${color.silver};
  caret-color: ${color.schoolBusYellow};

  &:focus {
    border: 1px solid ${color.white};
  }
  &:focus-visible {
    outline: none;
  }
  &:not(:placeholder-shown) {
    border: 1px solid ${color.white};
  }

  ${({ isError }) =>
    isError &&
    css`
      border: 1px solid ${color.error};
      &:not(:placeholder-shown) {
        border: 1px solid ${color.error};
      }
      &:focus {
        border: 1px solid ${color.white};
      }
    `}

  ${({ isDisabled }) =>
    isDisabled &&
    css`
      border: 1px solid ${color.scorpion};
      color: ${color.scorpion};
      &:not(:placeholder-shown) {
        border: 1px solid ${color.scorpion};
      }
    `}
`;

export const StyledLabel = styled.label<LabelProps>`
  ${LabelMedium};
  font-weight: ${fontWeight.bold};
  margin-bottom: 12px;
  color: ${color.silver};
  ${({ isRequired }) =>
    isRequired &&
    css`
      &:after {
        content: ' *';
        color: ${color.error};
      }
    `}
`;

export const TextError = styled.p`
  ${LabelMedium};
  color: ${color.error};
  margin-top: 12px;
`;
