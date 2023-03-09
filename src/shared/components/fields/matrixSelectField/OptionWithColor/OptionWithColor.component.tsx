import { components, OptionProps } from 'react-select';
import { ColorDot, ContainerWithColor } from '../matrixSelectField.styles';

export const OptionWithColor = (props: OptionProps) => {
  const { color, label } = props.data as unknown as { value: string; label: string; color: string };

  return (
    <components.Option {...props}>
      <ContainerWithColor>
        {label}
        <ColorDot color={color} />
      </ContainerWithColor>
    </components.Option>
  );
};
