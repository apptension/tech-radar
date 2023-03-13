import Select, { Props, components } from 'react-select';
import dropdownDown from '../../../../images/icons/dropdown-down.svg';
import { Container, selectStyles, StyledLabel, TextError } from './matrixSelectField.styles';

interface SelectFieldProps extends Props {
  label: string;
  error?: string;
  isRequired?: boolean;
  inputRef: any;
}

export const MatrixSelectField = ({ label, isRequired = false, error, inputRef, ...props }: SelectFieldProps) => {
  return (
    <Container>
      <StyledLabel isRequired={isRequired}>{label}</StyledLabel>
      <Select
        ref={inputRef}
        aria-invalid={Boolean(error)}
        styles={selectStyles}
        components={{
          DropdownIndicator: (props) => (
            <components.DropdownIndicator {...props}>
              <img src={dropdownDown} alt="dropdown arrow" />
            </components.DropdownIndicator>
          ),
        }}
        {...props}
      />
      {error && <TextError>{error}</TextError>}
    </Container>
  );
};
