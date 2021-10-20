import React from 'react';

import { Container, SearchIcon, InputWrapper, InputComponent, InputUnderline } from './input.styles';

interface InputProps {
  withSearchIcon?: boolean;
  placeholder?: string;
  onChange: (text: string) => void;
}

export const Input = ({ withSearchIcon, placeholder, onChange }: InputProps) => {
  return (
    <Container>
      <InputWrapper>
        <InputComponent placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
        {withSearchIcon && <SearchIcon />}
      </InputWrapper>
      <InputUnderline />
    </Container>
  );
};
