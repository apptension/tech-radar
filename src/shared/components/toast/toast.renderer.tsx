import { Toaster, ToastBar } from 'react-hot-toast';

const DURATION = 6000;
const POSITION = 'bottom-right';

export const ToastRenderer = () => {
  return (
    <Toaster position={POSITION} toastOptions={{ duration: DURATION }} containerStyle={{ padding: 0, margin: 0 }}>
      {(t) => (
        <ToastBar
          toast={t}
          position={POSITION}
          style={{
            ...t.style,
            background: 'transparent',
            padding: 0,
            boxShadow: 'none',
          }}
        />
      )}
    </Toaster>
  );
};
