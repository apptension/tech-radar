import React from 'react';
import { FormattedMessage } from 'react-intl';

import LineImg from '../../../images/line.png';
import { highlightBlip, highlightLegend, unhighlightBlip } from '../../utils/radarUtils';
import { color } from '../../../theme';
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

// TODO List has to get same data as radar (with id,x,y)
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
          <ListItem
            key={i}
            id={`list-item-${i}`}
            onMouseEnter={() => {
              // TODO pass real item data & show bubble
              highlightBlip({ id: i.toString(), ring: 0 });
              highlightLegend({ id: i.toString() });
            }}
            onMouseLeave={() => {
              // TODO pass real item data & hide bubble
              unhighlightBlip({ id: i.toString(), ring: 0, color: color.silver });
              highlightLegend({ id: i.toString(), mode: 'off' });
            }}
          >
            List item
          </ListItem>
        ))}
      </ListWrapper>
    </Container>
  );
};
