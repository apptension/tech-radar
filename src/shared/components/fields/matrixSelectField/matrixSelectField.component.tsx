import Select, { Props, components as selectComponents } from 'react-select';
import dropdownDown from '../../../../images/icons/dropdown-down.svg';
import { Container, selectStyles, StyledLabel, TextError } from './matrixSelectField.styles';

interface SelectFieldProps extends Props {
  label: string;
  error?: string;
  isRequired?: boolean;
  inputRef?: any;
}

export const MatrixSelectField = ({
  label,
  isRequired = false,
  error,
  components,
  inputRef,
  ...props
}: SelectFieldProps) => {
  return (
    <Container>
      <StyledLabel isRequired={isRequired}>{label}</StyledLabel>
      <Select
        ref={inputRef}
        aria-invalid={Boolean(error)}
        styles={selectStyles}
        components={{
          DropdownIndicator: (props) => (
            <selectComponents.DropdownIndicator {...props}>
              <img src={dropdownDown} alt="dropdown arrow" />
            </selectComponents.DropdownIndicator>
          ),
          ...components,
        }}
        {...props}
      />
      {error && <TextError>{error}</TextError>}
    </Container>
  );
};
