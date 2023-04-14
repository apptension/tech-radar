import styled, { css, keyframes, ThemeProps } from 'styled-components';
import theme from 'styled-theming';

import { ReactComponent as OutIconSVG } from '../../../images/icons/out.svg';
import { ReactComponent as ArrowIconSVG } from '../../../images/icons/arrow-right.svg';
import { ReactComponent as GetInTouchSVG } from '../../../images/icons/get-in-touch.svg';
import { border, color } from '../../../theme';
import { ButtonLargeTypography, ButtonRegularTypography } from '../../../theme/typography';
import { ButtonSize, ButtonTheme, ButtonVariant } from './button.types';

const disabledButtonStyle = css`
  background: ${color.scorpion};
`;

const buttonSizeRegularStyles = css`
  ${ButtonRegularTypography};
  padding: 8px 20px;
`;

const buttonSizeLargeStyles = css`
  ${ButtonLargeTypography};
  border-width: 2px;
  padding: 16px 32px;
  min-height: 60px;
`;

const buttonVariantPrimaryStyles = css`
  border: none;
  background: ${color.white};
  color: ${color.codGray};

  &:hover {
    background: none;
  }
`;

const buttonVariantSecondaryStyles = css`
  border: ${border.regularWhite};
  background: none;
  color: ${color.white};
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
  transition: transform 0.25s ease-in-out;
`;

export const Icon = styled.span<{ variant: ButtonVariant }>`
  display: flex;
  align-items: center;
  margin-right: 10px;

  path {
    ${({ variant }) => variant === ButtonVariant.PRIMARY && `stroke: ${color.black}`};
    transition: stroke 0.25s ease-in-out;
  }

  &:first-of-type path {
    stroke: ${color.black};
  }
`;

export const OutIcon = styled(OutIconSVG)``;

export const ArrowIcon = styled(ArrowIconSVG)`
  width: 24px;
  height: 14px;
`;

export const GetInTouchIcon = styled(GetInTouchSVG)``;

interface ContainerProps extends ThemeProps<ButtonTheme> {
  withoutHoverEffects?: boolean;
  withMovingArrow?: boolean;
}

export const Container = styled.button<ContainerProps>`
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 2px;
  transition: 0.25s ease-in-out;
  transition-property: background, color;
  z-index: 0;

  ${theme('size', {
    [ButtonSize.REGULAR]: buttonSizeRegularStyles,
    [ButtonSize.LARGE]: buttonSizeLargeStyles,
  })};

  ${theme('variant', {
    [ButtonVariant.PRIMARY]: buttonVariantPrimaryStyles,
    [ButtonVariant.SECONDARY]: buttonVariantSecondaryStyles,
  })}

  ${theme('withBorder', {
    false: buttonNoBorderStyles,
  })}

${theme('isDisabled', {
    true: disabledButtonStyle,
  })};

  &:disabled {
    transition: none;
  }

  &::before {
    content: '';
    display: ${({ withoutHoverEffects }) => (withoutHoverEffects ? 'none' : 'block')};
    width: calc(100% + 2px);
    height: calc(100% + 2px);
    position: absolute;
    top: -1px;
    left: -1px;
    z-index: -1;
    border-radius: 2px;
    background: ${color.gradient};
    opacity: 0;
    transition: opacity 0.25s ease-in-out;
  }

  &:disabled {
    &::before {
      background: ${color.scorpion};
      transition: none;
    }
  }

  &:hover {
    color: ${color.black};
    border-color: transparent;

    &::before {
      opacity: 1;
    }

    ${IconContainerInner} {
      transform: ${({ withMovingArrow }) => (withMovingArrow ? 'translateX(0)' : 'translateX(-50%)')};
    }

    ${IconContainerInner} ${Icon}:last-of-type path {
      stroke: ${({ withMovingArrow }) => (withMovingArrow ? `${color.white}` : `${color.black}`)};
    }
  }
`;

const rotateAnimation = keyframes`
  0% {
      transform: rotate(0deg);
  }
  100% {
      transform: rotate(360deg);
    }
`;

export const Loader = styled.div`
  width: 16px;
  height: 16px;
  border: 3px solid ${color.silver};
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: ${rotateAnimation} 1s linear infinite;
`;
