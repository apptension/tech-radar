import { ReactComponent as CloseSVG } from '../../../../images/icons/tag-close.svg';
import { Container, Text } from './skillTag.styles';

interface SkillTagProps {
  color: string;
  name: string;
  withRemove?: boolean;
}

export const SkillTag = ({ color, name, withRemove }: SkillTagProps) => {
  return (
    <Container color={color}>
      <Text>{name}</Text>
      {withRemove && <CloseSVG width={9} height={9} />}
    </Container>
  );
};
