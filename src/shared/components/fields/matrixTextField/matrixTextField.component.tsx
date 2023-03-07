import { forwardRef, InputHTMLAttributes } from 'react';
import { Container, StyledInput, StyledLabel, TextError } from './matrixTextField.styles';

interface MatrixTextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
}

export const MatrixTextField = forwardRef<HTMLInputElement, MatrixTextFieldProps>(
  ({ label, error, isDisabled = false, isRequired = false, ...props }, ref) => {
    return (
      <Container>
        <StyledLabel isRequired={isRequired}>{label}</StyledLabel>
        <StyledInput
          ref={ref}
          placeholder=" "
          isError={Boolean(error)}
          isDisabled={isDisabled}
          disabled={isDisabled}
          {...props}
        />
        {error && <TextError>{error}</TextError>}
      </Container>
    );
  }
);
