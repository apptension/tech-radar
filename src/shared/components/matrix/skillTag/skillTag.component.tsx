import { ReactComponent as CloseSVG } from '../../../../images/icons/tag-close.svg';
import { CloseButton, Container, Text } from './skillTag.styles';

interface SkillTagProps {
  color: string;
  name: string;
  onRemove?: () => void;
}

export const SkillTag = ({ color, name, onRemove }: SkillTagProps) => {
  return (
    <Container color={color}>
      <Text>{name}</Text>
      {onRemove && (
        <CloseButton onClick={onRemove}>
          <CloseSVG width={9} height={9} />
        </CloseButton>
      )}
    </Container>
  );
};
