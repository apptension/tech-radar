import { useDispatch } from 'react-redux';

export const useStepDispatch = <T,>() => {
  const dispatch = useDispatch();
  const stepDispatch = (payload: T) => {
    return setTimeout(() => {
      dispatch(payload);
    }, 0);
  };
  return stepDispatch;
};
