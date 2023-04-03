import { ReactNode, useState } from 'react';
import { ChildrenContainer, TooltipContainer } from './infoTooltip.styles';

interface InfoTooltipProps {
  children: ReactNode;
  activator: ReactNode;
}

export const InfoTooltip = ({ children, activator }: InfoTooltipProps) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <ChildrenContainer onMouseEnter={() => setIsActive(true)} onMouseLeave={() => setIsActive(false)}>
      {activator}
      {isActive && <TooltipContainer>{children}</TooltipContainer>}
    </ChildrenContainer>
  );
};
