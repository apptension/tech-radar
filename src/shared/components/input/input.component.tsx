import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useDebouncedCallback } from 'use-debounce';

import { Container, SearchIcon, InputWrapper, InputComponent, InputUnderline } from './input.styles';
import messages from './input.messages';

interface InputProps {
  setSearchText: (text: string) => void;
}

export const Input = ({ setSearchText }: InputProps) => {
  const debouncedOnTextChange = useDebouncedCallback((text: string) => {
    setSearchText(text);
  }, 500);

  return (
    <Container>
      <InputWrapper>
        <FormattedMessage {...messages.placeholder}>
          {(placeholder) => (
            <InputComponent
              placeholder={placeholder.toString()}
              onChange={(e) => debouncedOnTextChange(e.target.value)}
            />
          )}
        </FormattedMessage>
        <SearchIcon />
      </InputWrapper>
      <InputUnderline />
    </Container>
  );
};
