import styled, { css } from 'styled-components';
import { ReactComponent as InfoSVG } from '../../../../images/icons/info-circle.svg';
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
  position: relative;
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

export const LabelWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 12px;
  gap: 10px;
`;

export const InfoIcon = styled(InfoSVG)``;

export const TextError = styled.p`
  ${LabelMedium};
  color: ${color.error};
  margin-top: 12px;
  margin-bottom: 0;
`;

export const InfoTooltipContainer = styled.div`
  position: relative;
  width: 520px;
`;
