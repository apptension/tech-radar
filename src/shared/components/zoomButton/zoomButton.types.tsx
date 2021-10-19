export interface ZoomButtonProps {
  className?: string;
  onClick: () => void;
  disabled?: boolean;
  type?: ZoomButtonType;
}

export enum ZoomButtonType {
  IN = 'in',
  OUT = 'out',
}
