import { components, SingleValueProps } from 'react-select';
import { ColorDot, ContainerWithColor } from '../matrixSelectField.styles';

export const SingleValueWithColor = (props: SingleValueProps) => {
  const { color, label } = props.data as unknown as { value: string; label: string; color: string };

  return (
    <components.SingleValue {...props}>
      <ContainerWithColor>
        {label}
        <ColorDot color={color} />
      </ContainerWithColor>
    </components.SingleValue>
  );
};
