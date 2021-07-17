import { useEffect, useRef, useState } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function usePrevious<T>(val: T) {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = val;
  });
  return ref.current;
}

/**
 * custom hook used to check if a CRUD operation is successful
 * if loading state change from true => false and error is null
 * indicate that the opration is successfule else it is fail
 * */
export function useCheckSuccess({ loadingState, error }: { loadingState: boolean; error: any }) {
  const [success, setSuccess] = useState<boolean>(false);
  const previous = usePrevious({ loadingState });
  useEffect(() => {
    if (!previous) return;
    if (previous.loadingState !== loadingState && !loadingState && !error) {
      setSuccess(true);
    }
  }, [previous, setSuccess, loadingState, error]);
  return success;
}
