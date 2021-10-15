import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';

import LineImg from '../../../images/line.png';
import {
  Container,
  SearchInputWrapper,
  SearchWrapper,
  SearchIcon,
  Image,
  ListWrapper,
  SearchInput,
  ListItem,
} from './list.styles';
import messages from './list.messages';

export const List = () => {
  return (
    <Container>
      <SearchWrapper>
        <SearchInputWrapper>
          <FormattedMessage {...messages.searchPlaceholder}>
            {(placeholder) => <SearchInput placeholder={placeholder.toString()} />}
          </FormattedMessage>
          <SearchIcon />
        </SearchInputWrapper>
        <Image src={LineImg} />
      </SearchWrapper>

      <ListWrapper>
        {'123456789012345678901234'.split('').map((number, i) => (
          <ListItem active={i === 5} key={i} id={`list-item-${i}`}>
            List item
          </ListItem>
        ))}
      </ListWrapper>
    </Container>
  );
};
