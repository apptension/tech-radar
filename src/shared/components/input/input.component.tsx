import React from 'react';
import { FormattedMessage } from 'react-intl';

import LineImg from '../../../images/line.png';
import { SearchWrapper, SearchIcon, Image, SearchInputWrapper, SearchInput } from './input.styles';
import messages from './input.messages';

export const Input = () => {
  return (
    <SearchWrapper>
      <SearchInputWrapper>
        <FormattedMessage {...messages.placeholder}>
          {(placeholder) => <SearchInput placeholder={placeholder.toString()} />}
        </FormattedMessage>
        <SearchIcon />
      </SearchInputWrapper>
      <Image src={LineImg} />
    </SearchWrapper>
  );
};
