import React from 'react';

import { ZoomButton } from '../zoomButton';
import { ZoomButtonType } from '../zoomButton/zoomButton.types';
import { Container } from './zoomControls.styles';

export interface ZoomControlsProps {
  className?: string;
  onZoomIn: () => void;
  onZoomOut: () => void;
  zoomInDisabled?: boolean;
  zoomOutDisabled?: boolean;
}

export const ZoomControls = ({
  className,
  onZoomIn,
  onZoomOut,
  zoomInDisabled,
  zoomOutDisabled,
}: ZoomControlsProps) => {
  return (
    <Container className={className}>
      <ZoomButton onClick={onZoomIn} disabled={zoomInDisabled} />
      <ZoomButton type={ZoomButtonType.OUT} onClick={onZoomOut} disabled={zoomOutDisabled} />
    </Container>
  );
};
