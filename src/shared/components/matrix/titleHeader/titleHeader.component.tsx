import { ReactNode } from 'react';
import { InfoText, Title, TitleContainer } from './titleHeader.styles';

interface HeaderProps {
  title: string;
  content: ReactNode;
}

export const TitleHeader = ({ title, content }: HeaderProps) => {
  return (
    <TitleContainer>
      <Title>{title}</Title>
      <InfoText>{content}</InfoText>
    </TitleContainer>
  );
};
