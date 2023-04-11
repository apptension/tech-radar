import {
  Container,
  SearchIcon,
  InputWrapper,
  InputComponent,
  InputUnderline,
  CloseIcon,
  CloseButton,
} from './input.styles';

interface InputProps {
  withSearchIcon?: boolean;
  placeholder?: string;
  defaultValue?: string;
  onChange: (text: string) => void;
}

export const Input = ({ withSearchIcon, placeholder, onChange, defaultValue = '' }: InputProps) => {
  return (
    <Container>
      <InputWrapper>
        <InputComponent placeholder={placeholder} onChange={(e) => onChange(e.target.value)} value={defaultValue} />
        {withSearchIcon && defaultValue ? (
          <CloseButton onClick={() => onChange('')}>
            <CloseIcon width={12} height={12} />
          </CloseButton>
        ) : (
          <SearchIcon />
        )}
      </InputWrapper>
      <InputUnderline />
    </Container>
  );
};
