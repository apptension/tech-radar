import { ReactNode, useState } from 'react';
import { ChevronIcon, HeadContainer, HeaderButton, List } from './technologyGroup.styles';

interface TechnologyGroupProps {
  title: string;
  amount: number;
  children: ReactNode;
}

export const TechnologyGroup = ({ title, amount, children }: TechnologyGroupProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleIsOpen = () => {
    setIsOpen((open) => !open);
  };

  return (
    <div>
      <HeaderButton onClick={toggleIsOpen}>
        <HeadContainer>
          {title} ({amount})
        </HeadContainer>
        <ChevronIcon isRotated={isOpen} />
      </HeaderButton>
      {isOpen && <List>{children}</List>}
    </div>
  );
};
