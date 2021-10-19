import React, { useEffect, useState } from 'react';

import { useIntl } from 'react-intl';
import { Container, MinusIcon, PlusIcon } from './zoomButton.styles';
import { ZoomButtonProps, ZoomButtonType } from './zoomButton.types';
import messages from './zoomButton.messages';

export const ZoomButton = ({ className, onClick, disabled, type = ZoomButtonType.IN }: ZoomButtonProps) => {
  const intl = useIntl();
  const isZoomIn = type === ZoomButtonType.IN;
  const [animated, setAnimated] = useState(false);

  const handleClick = () => {
    setAnimated(true);
    onClick();
  };

  useEffect(() => {
    if (animated) {
      setTimeout(() => {
        setAnimated(false);
      }, 1500);
    }
  }, [animated]);

  const renderIcon = () => (isZoomIn ? <PlusIcon /> : <MinusIcon />);
  const title = isZoomIn ? messages.zoomInButtonTitle : messages.zoomOutButtonTitle;

  return (
    <Container
      className={className}
      title={intl.formatMessage(title)}
      onClick={handleClick}
      disabled={disabled}
      animated={animated}
    >
      {renderIcon()}
    </Container>
  );
};
