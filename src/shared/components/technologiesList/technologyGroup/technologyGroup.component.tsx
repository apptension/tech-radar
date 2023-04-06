import { ReactNode, useState } from 'react';
import { ReactComponent as InfoSVG } from '../../../../images/icons/info-circle.svg';
import { InfoTooltip } from '../../infoTooltip';
import { ChevronIcon, HeadContainer, HeaderButton, List } from './technologyGroup.styles';
interface TechnologyGroupProps {
  title: string;
  amount: number;
  children: ReactNode;
  infoContent: string;
}

export const TechnologyGroup = ({ title, amount, infoContent, children }: TechnologyGroupProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [increaseZindex, setIncreaseZindex] = useState(false);

  const toggleIsOpen = () => {
    setIsOpen((open) => !open);
  };

  return (
    <div>
      <HeaderButton increasedZindex={increaseZindex} onClick={toggleIsOpen}>
        <HeadContainer>
          {title} ({amount})
          <InfoTooltip
            activator={<InfoSVG />}
            handleMouseEnter={() => setIncreaseZindex(true)}
            handleMouseLeave={() => setIncreaseZindex(false)}
          >
            {infoContent}
          </InfoTooltip>
        </HeadContainer>
        <ChevronIcon reversed={isOpen} />
      </HeaderButton>
      {isOpen && <List>{children}</List>}
    </div>
  );
};
