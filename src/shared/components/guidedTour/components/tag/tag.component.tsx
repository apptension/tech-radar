import { StyledTag } from './tag.styles';

interface TagProps {
  value: string;
  activeTag?: string;
  onClick?: (value: string) => void;
}

export const Tag = ({ value, onClick, activeTag }: TagProps) => {
  return (
    <StyledTag isActive={activeTag === value} onClick={() => onClick && onClick(value)}>
      <span>{value}</span>
    </StyledTag>
  );
};
