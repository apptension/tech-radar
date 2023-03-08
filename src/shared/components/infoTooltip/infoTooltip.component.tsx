import { ReactNode, useState } from 'react';
import { ChildrenContainer, TooltipContainer } from './infoTooltip.styles';

interface InfoTooltipProps {
  children: ReactNode;
  content: string;
}

export const InfoTooltip = ({ children, content }: InfoTooltipProps) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <ChildrenContainer onMouseEnter={() => setIsActive(true)} onMouseLeave={() => setIsActive(false)}>
      {children}
      {isActive && <TooltipContainer>{content}</TooltipContainer>}
    </ChildrenContainer>
  );
};
