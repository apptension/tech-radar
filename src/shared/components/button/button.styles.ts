import styled, { css, ThemeProps } from 'styled-components';
import theme from 'styled-theming';

import { border, color } from '../../../theme';
import { ButtonTheme } from './button.types';

const disabledButtonStyle = css`
  opacity: 0.5;
`;

export const Container = styled.button<ThemeProps<ButtonTheme>>`
  padding: 8px 20px;
  border: ${border.regularWhite};
  background: none;
  color: ${color.white};
  cursor: pointer;
  font-size: 16px;
  line-height: 24px;

  ${theme('isDisabled', {
    true: disabledButtonStyle,
  })};
`;
