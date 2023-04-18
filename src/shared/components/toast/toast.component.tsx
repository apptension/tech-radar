import { toast } from 'react-hot-toast';

import { ReactComponent as CloseIcon } from '../../../images/icons/close.svg';
import { ReactComponent as InfoIcon } from '../../../images/icons/info-circle.svg';
import { ReactComponent as CheckmarkIcon } from '../../../images/icons/checkmark-circle.svg';
import { ReactComponent as WarningIcon } from '../../../images/icons/warning-circle.svg';
import { ReactComponent as ErrorIcon } from '../../../images/icons/error-circle.svg';

import { color } from '../../../theme';
import { Body, CloseButton, Container, IconContainer, Paragraph, Title } from './toast.styles';

export enum ToastType {
  INFORMATION = 'Information',
  WARNING = 'Warning',
  ERROR = 'Error',
  SUCCESS = 'Success',
}

interface ToastProps {
  message: string;
  id: string;
  type: ToastType;
}

const icons = {
  [ToastType.INFORMATION]: <InfoIcon height={24} width={24} />,
  [ToastType.SUCCESS]: <CheckmarkIcon />,
  [ToastType.WARNING]: <WarningIcon />,
  [ToastType.ERROR]: <ErrorIcon />,
};

const colors = {
  [ToastType.INFORMATION]: color.secondary,
  [ToastType.SUCCESS]: color.primary,
  [ToastType.WARNING]: color.warning,
  [ToastType.ERROR]: color.brightError,
};

const getByType = (type: ToastType, obj: { [key in ToastType]: any }) => obj[type];

export const Toast = ({ message, id, type }: ToastProps) => {
  const icon = getByType(type, icons);
  const color = getByType(type, colors);

  return (
    <Container color={color}>
      <IconContainer>{icon}</IconContainer>
      <Body>
        <Title>{type}</Title>
        <Paragraph>{message}</Paragraph>
      </Body>
      <CloseButton onClick={() => toast.dismiss(id)}>
        <CloseIcon width={12} height={12} />
      </CloseButton>
    </Container>
  );
};
