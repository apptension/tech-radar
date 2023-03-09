import { InfoTooltip } from '../../../infoTooltip';

import { Container, InfoIcon, InfoIconContainer, LabelText } from './labelBar.styles';

interface LabelBarProps {
  label: string;
  infoContent?: string;
}

export const LabelBar = ({ label, infoContent }: LabelBarProps) => {
  return (
    <Container>
      <LabelText>{label}</LabelText>
      {infoContent && (
        <InfoIconContainer>
          <InfoTooltip content={infoContent}>
            <InfoIcon />
          </InfoTooltip>
        </InfoIconContainer>
      )}
    </Container>
  );
};
