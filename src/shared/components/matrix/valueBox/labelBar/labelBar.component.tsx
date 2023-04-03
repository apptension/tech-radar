import { ReactNode } from 'react';
import { InfoTooltip } from '../../../infoTooltip';

import { Container, InfoIcon, InfoIconContainer, LabelText } from './labelBar.styles';

interface LabelBarProps {
  label: string;
  infoContent?: ReactNode;
}

export const LabelBar = ({ label, infoContent }: LabelBarProps) => {
  return (
    <Container>
      <LabelText>{label}</LabelText>
      {infoContent && (
        <InfoIconContainer>
          <InfoTooltip activator={<InfoIcon />}>{infoContent}</InfoTooltip>
        </InfoIconContainer>
      )}
    </Container>
  );
};
