import { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { ReactComponent as InfoSVG } from '../../../../images/icons/info-circle.svg';
import { InfoTooltip } from '../../infoTooltip';
import { ChevronIcon, HeadContainer, HeaderButton, List } from './technologyGroup.styles';
interface TechnologyGroupProps {
  title: string;
  amount: number;
  children: ReactNode;
  infoContent: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const TechnologyGroup = ({ title, amount, infoContent, children, isOpen, setIsOpen }: TechnologyGroupProps) => {
  const [increaseZindex, setIncreaseZindex] = useState(false);

  return (
    <div>
      <HeaderButton increasedZindex={increaseZindex} onClick={() => setIsOpen((isOpen) => !isOpen)}>
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
