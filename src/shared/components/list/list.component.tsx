import React from 'react';

import { highlightBlip, highlightLegend, unhighlightBlip } from '../../utils/radarUtils';
import { color } from '../../../theme';
import { ListWrapper, ListItem } from './list.styles';

// TODO List has to get same data as radar (with id,x,y)
export const List = () => {
  return (
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
  );
};
