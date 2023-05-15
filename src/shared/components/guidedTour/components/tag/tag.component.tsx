import { StyledTag } from './tag.styles';

interface TagProps {
  value: string;
  activeTag?: string;
  isStatic?: boolean;
  onClick?: (value: string) => void;
}

export const Tag = ({ value, onClick, activeTag, isStatic = false }: TagProps) => {
  return (
    <StyledTag isActive={activeTag === value} isStatic={isStatic} onClick={() => onClick && onClick(value)}>
      <span>{value}</span>
    </StyledTag>
  );
};
