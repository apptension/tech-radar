import React, { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import { isNil } from 'ramda';

import { renderWhenTrue } from '../../utils/rendering';
import { Container, Icon, RemoveIcon } from './tag.styles';
import { TagSize, TagTheme } from './tag.types';

export interface TagProps {
  size?: TagSize;
  onRemove?: () => void;
  className?: string;
  children?: ReactNode;
}

export const Tag = ({ children, className, onRemove, size = TagSize.MEDIUM }: TagProps) => {
  const theme: TagTheme = { size };

  const renderRemoveIcon = renderWhenTrue(() => (
    <Icon>
      <RemoveIcon />
    </Icon>
  ));

  return (
    <ThemeProvider theme={theme}>
      <Container className={className} onClick={onRemove}>
        {children}
        {renderRemoveIcon(!isNil(onRemove))}
      </Container>
    </ThemeProvider>
  );
};
