import { useCallback, useRef } from 'react';
import { useUnmount } from './use-unmount';

type DebounceOptions = {
  leading?: boolean;
  trailing?: boolean;
  maxWait?: number;
};

type ControlFunctions = {
  cancel: () => void;
  flush: () => void;
  isPending: () => boolean;
};

export type DebouncedState<T extends (...args: any) => ReturnType<T>> = ((
  ...args: Parameters<T>
) => ReturnType<T> | undefined) &
  ControlFunctions;

export function useDebounceCallback<T extends (...args: any) => ReturnType<T>>(
  func: T,
  delay = 500,
  _options?: DebounceOptions
): DebouncedState<T> {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const funcRef = useRef(func);

  // 최신 함수 참조 유지
  funcRef.current = func;

  useUnmount(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  });

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      // 이전 타이머가 있으면 취소
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // 새로운 타이머 설정
      timeoutRef.current = setTimeout(() => {
        funcRef.current.apply(null, args);
        timeoutRef.current = null;
      }, delay);
    },
    [delay]
  ) as DebouncedState<T>;

  // 컨트롤 함수들 추가
  debouncedCallback.cancel = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  debouncedCallback.flush = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
      // 즉시 실행은 생략 (필요시 구현)
    }
  };

  debouncedCallback.isPending = () => {
    return timeoutRef.current !== null;
  };

  return debouncedCallback;
}
