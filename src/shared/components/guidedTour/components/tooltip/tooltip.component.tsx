import { TooltipRenderProps } from 'react-joyride';
import { Button } from '../../../button';
import { ButtonVariant } from '../../../button/button.types';
import {
  ButtonsContainer,
  CloseButton,
  CloseIcon,
  TooltipContainer,
  TooltipContent,
  TooltipFooter,
  TooltipTitle,
} from './tooltip.styles';

export const Tooltip = ({
  continuous,
  index,
  step,
  size,
  backProps,
  skipProps,
  primaryProps,
  tooltipProps,
}: TooltipRenderProps) => {
  const isFirst = index === 0;
  const isLast = index === size - 1;

  return (
    <TooltipContainer {...tooltipProps}>
      {step.title && <TooltipTitle>{step.title}</TooltipTitle>}
      <TooltipContent>{step.content}</TooltipContent>
      <TooltipFooter>
        <span style={{ opacity: isFirst ? 0 : 1 }}>
          {index}/{size - 1}
        </span>
        <ButtonsContainer>
          {isFirst ? (
            <>
              <Button {...skipProps} withoutHoverEffects withBorder={false}>
                Skip
              </Button>
              <Button variant={ButtonVariant.PRIMARY} {...primaryProps}>
                Get started
              </Button>
            </>
          ) : (
            <>
              <Button {...backProps}>Back</Button>
              {continuous && (
                <Button variant={ButtonVariant.PRIMARY} {...primaryProps}>
                  {isLast ? 'Finish' : 'Next'}
                </Button>
              )}
            </>
          )}
        </ButtonsContainer>
        <CloseButton {...skipProps} withoutHoverEffects>
          <CloseIcon />
        </CloseButton>
      </TooltipFooter>
    </TooltipContainer>
  );
};
