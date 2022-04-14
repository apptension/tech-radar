import React from 'react';

import { Container, SearchIcon, InputWrapper, InputComponent, InputUnderline } from './input.styles';

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
        <InputComponent
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          defaultValue={defaultValue}
        />
        {withSearchIcon && <SearchIcon />}
      </InputWrapper>
      <InputUnderline />
    </Container>
  );
};
