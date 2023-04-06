import { MouseEvent, ReactNode, useState } from 'react';
import { ChildrenContainer, TooltipContainer } from './infoTooltip.styles';

interface InfoTooltipProps {
  children: ReactNode;
  activator: ReactNode;
  handleMouseEnter?: (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => void;
  handleMouseLeave?: (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => void;
}

export const InfoTooltip = ({ children, activator, handleMouseEnter, handleMouseLeave }: InfoTooltipProps) => {
  const [isActive, setIsActive] = useState(false);

  const onMouseEnter: InfoTooltipProps['handleMouseEnter'] = (e) => {
    if (handleMouseEnter) {
      handleMouseEnter(e);
    }
    setIsActive(true);
  };

  const onMouseLeave: InfoTooltipProps['handleMouseLeave'] = (e) => {
    if (handleMouseLeave) {
      handleMouseLeave(e);
    }
    setIsActive(false);
  };

  return (
    <ChildrenContainer onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {activator}
      {isActive && <TooltipContainer>{children}</TooltipContainer>}
    </ChildrenContainer>
  );
};
