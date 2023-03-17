import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import { InfoTooltip } from '../../infoTooltip';
import { ReactComponent as SearchSVG } from '../../../../images/icons/search.svg';
import {
  Container,
  IconContainer,
  InfoIcon,
  LabelWrapper,
  StyledInput,
  InputWrapper,
  StyledLabel,
  TextError,
} from './matrixTextField.styles';

interface MatrixTextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  infoContent?: string;
  icon?: MatrixTextFieldIcon;
}

type MatrixTextFieldIcon = 'search';

const iconTypes: { [key in MatrixTextFieldIcon]: ReactNode } = {
  search: <SearchSVG width={24} height={24} />,
};

export const MatrixTextField = forwardRef<HTMLInputElement, MatrixTextFieldProps>(
  ({ label, error, isDisabled = false, isRequired = false, infoContent, icon, ...props }, ref) => {
    const getIcon = () => icon && iconTypes[icon];

    return (
      <Container>
        <LabelWrapper>
          <StyledLabel isRequired={isRequired}>{label}</StyledLabel>
          {infoContent && <InfoTooltip activator={<InfoIcon />}>{infoContent}</InfoTooltip>}
        </LabelWrapper>
        <InputWrapper>
          <StyledInput
            ref={ref}
            placeholder=" "
            isError={Boolean(error)}
            isDisabled={isDisabled}
            disabled={isDisabled}
            {...props}
          />
          {icon && <IconContainer>{getIcon()}</IconContainer>}
        </InputWrapper>
        {error && <TextError>{error}</TextError>}
      </Container>
    );
  }
);
