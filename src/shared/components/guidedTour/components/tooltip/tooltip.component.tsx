import { useIntl } from 'react-intl';
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
import messages from './tooltip.messages';

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
  const intl = useIntl();

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
                {intl.formatMessage(messages.skip)}
              </Button>
              <Button variant={ButtonVariant.PRIMARY} {...primaryProps} withoutHoverEffects>
                {intl.formatMessage(messages.getStarted)}
              </Button>
            </>
          ) : (
            <>
              <Button {...backProps}>{intl.formatMessage(messages.back)}</Button>
              {continuous && (
                <Button variant={ButtonVariant.PRIMARY} {...primaryProps}>
                  {intl.formatMessage(isLast ? messages.finish : messages.next)}
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
