import React from 'react';

import { useIntl } from 'react-intl';
import { Container, PlusIcon, MinusIcon, ZoomButton } from './zoomControls.styles';
import messages from './zoomControls.messages';

export interface HeaderProps {
  className?: string;
  onZoomIn: () => void;
  onZoomOut: () => void;
}

export const ZoomControls = ({ className, onZoomIn, onZoomOut }: HeaderProps) => {
  const intl = useIntl();

  return (
    <Container className={className}>
      <ZoomButton title={intl.formatMessage(messages.zoomInButtonTitle)} onClick={onZoomIn}>
        <PlusIcon />
      </ZoomButton>
      <ZoomButton title={intl.formatMessage(messages.zoomOutButtonTitle)} onClick={onZoomOut}>
        <MinusIcon />
      </ZoomButton>
    </Container>
  );
};
