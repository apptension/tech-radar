import toast from 'react-hot-toast';
import { Toast, ToastType } from './toast.component';

export interface useToastProps {
  message: string;
  type: ToastType;
}

export const useToast = () => {
  const info = (message: string) => toast(({ id }) => <Toast type={ToastType.INFORMATION} message={message} id={id} />);

  const success = (message: string) => toast(({ id }) => <Toast type={ToastType.SUCCESS} message={message} id={id} />);

  const warning = (message: string) => toast(({ id }) => <Toast type={ToastType.WARNING} message={message} id={id} />);

  const error = (message: string) => toast(({ id }) => <Toast type={ToastType.ERROR} message={message} id={id} />);

  return { info, warning, error, success };
};
