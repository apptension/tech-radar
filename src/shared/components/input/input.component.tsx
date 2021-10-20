import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useDebouncedCallback } from 'use-debounce';

import { useDispatch } from 'react-redux';
import { FilterType } from '../../../modules/filters/filters.types';
import { setSearch } from '../../../modules/filters/filters.actions';
import { Container, SearchIcon, InputWrapper, InputComponent, InputUnderline } from './input.styles';
import messages from './input.messages';

export const Input = () => {
  const dispatch = useDispatch();

  const debouncedOnTextChange = useDebouncedCallback((option: FilterType) => {
    dispatch(setSearch(option));
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
