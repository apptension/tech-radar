import { forwardRef, InputHTMLAttributes } from 'react';
import { StyledLabel, TextError } from '../fields.styles';
import { Container, StyledInput } from './TextField.styles';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(({ label, error, ...props }, ref) => {
  return (
    <Container>
      <StyledLabel>{label}</StyledLabel>
      <StyledInput ref={ref} {...props} />
      {error && <TextError>{error}</TextError>}
    </Container>
  );
});
