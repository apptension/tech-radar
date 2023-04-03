import { InfoText, Title, TitleContainer } from './titleHeader.styles';

interface HeaderProps {
  title: string;
  content: string;
}

export const TitleHeader = ({ title, content }: HeaderProps) => {
  return (
    <TitleContainer>
      <Title>{title}</Title>
      <InfoText>{content}</InfoText>
    </TitleContainer>
  );
};
