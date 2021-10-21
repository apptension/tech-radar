import React, { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import { isNil } from 'ramda';

import { renderWhenTrue } from '../../utils/rendering';
import { Container, Icon, RemoveIcon } from './tag.styles';
import { TagSize, TagTheme, TagVariant } from './tag.types';

export interface TagProps {
  size?: TagSize;
  onRemove?: () => void;
  className?: string;
  children?: ReactNode;
  variant?: TagVariant;
}

export const Tag = ({
  children,
  className,
  onRemove,
  size = TagSize.MEDIUM,
  variant = TagVariant.DEFAULT,
}: TagProps) => {
  const clickable = !isNil(onRemove);
  const theme: TagTheme = { size, variant, clickable };

  const renderRemoveIcon = renderWhenTrue(() => (
    <Icon onClick={onRemove}>
      <RemoveIcon />
    </Icon>
  ));

  return (
    <ThemeProvider theme={theme}>
      <Container className={className}>
        {children}
        {renderRemoveIcon(clickable)}
      </Container>
    </ThemeProvider>
  );
};
