import { forwardRef, InputHTMLAttributes } from 'react';
import { InfoTooltip } from '../../infoTooltip';
import { Container, InfoIcon, LabelWrapper, StyledInput, StyledLabel, TextError } from './matrixTextField.styles';

interface MatrixTextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  infoContent?: string;
}

export const MatrixTextField = forwardRef<HTMLInputElement, MatrixTextFieldProps>(
  ({ label, error, isDisabled = false, isRequired = false, infoContent, ...props }, ref) => {
    return (
      <Container>
        <LabelWrapper>
          <StyledLabel isRequired={isRequired}>{label}</StyledLabel>
          {infoContent && (
            <InfoTooltip content={infoContent}>
              <InfoIcon />
            </InfoTooltip>
          )}
        </LabelWrapper>
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
