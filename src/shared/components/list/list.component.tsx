import React from 'react';
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
        {'MOCKFACTORYMOCKFACTORYMOCKFACTOR'.split('').map((letter, i) => (
          <ListItem active={i === 5} key={i}>
            List item
          </ListItem>
        ))}
      </ListWrapper>
    </Container>
  );
};
