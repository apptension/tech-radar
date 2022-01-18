import styled, { css, ThemeProps } from 'styled-components';
import theme from 'styled-theming';

import { ReactComponent as OutIconSVG } from '../../../images/icons/out.svg';
import { ReactComponent as ArrowIconSVG } from '../../../images/icons/arrow-right.svg';
import { border, color } from '../../../theme';
import { ButtonLargeTypography, ButtonRegularTypography } from '../../../theme/typography';
import { ButtonSize, ButtonTheme } from './button.types';

const disabledButtonStyle = css`
  opacity: 0.5;
`;

const buttonSizeRegularStyles = css`
  ${ButtonRegularTypography};
  padding: 8px 20px;
`;

const buttonSizeLargeStyles = css`
  ${ButtonLargeTypography};
  border-width: 2px;
  padding: 16px 32px;
`;

const buttonNoBorderStyles = css`
  border: none;
`;

export const IconContainer = styled.span`
  margin-left: 10px;
  display: flex;
  align-items: center;
  width: 23px;
  overflow: hidden;
`;

export const IconContainerInner = styled.span`
  display: flex;
  align-items: center;
  transform: translateX(-50%);
  will-change: transform;
`;

export const Icon = styled.span`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

export const OutIcon = styled(OutIconSVG)``;

export const ArrowIcon = styled(ArrowIconSVG)``;

export const Container = styled.button<ThemeProps<ButtonTheme>>`
  border: ${border.regularWhite};
  background: none;
  color: ${color.white};
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 2px;

  ${theme('isDisabled', {
    true: disabledButtonStyle,
  })};

  ${theme('size', {
    [ButtonSize.REGULAR]: buttonSizeRegularStyles,
    [ButtonSize.LARGE]: buttonSizeLargeStyles,
  })};

  ${theme('withBorder', {
    false: buttonNoBorderStyles,
  })}

  &:hover ${IconContainerInner} {
     {
      transform: translateX(0);
      transition: transform 0.25s ease-in-out;
      transition-delay: 0.02s;
    }
  }
`;
