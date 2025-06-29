import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

type OverlayElement<T> = (props: {
  isOpen: boolean;
  close: () => void;
  confirm: (data: T) => void;
}) => React.ReactElement;

interface OverlayContextType {
  open: <T>(overlayComponent: OverlayElement<T>) => Promise<{ isConfirmed: boolean; data?: T }>;
}

const OverlayContext = createContext<OverlayContextType | null>(null);

function _useOverlay() {
  const [overlayElement, setOverlayElement] = useState<React.ReactElement | null>(null);

  const open = useCallback(<T,>(render: OverlayElement<T>) => {
    return new Promise<{ isConfirmed: boolean; data?: T }>((resolve) => {
      const close = () => {
        setOverlayElement(null);
        resolve({ isConfirmed: false });
      };

      const confirm = (data: T) => {
        setOverlayElement(null);
        resolve({ isConfirmed: true, data });
      };

      const element = render({
        isOpen: true,
        close,
        confirm,
      });

      setOverlayElement(element);
    });
  }, []);

  return useMemo(
    () => ({
      open,
      overlayElement,
    }),
    [open, overlayElement]
  );
}

export function OverlayProvider({ children }: { children: React.ReactNode }) {
  const { open, overlayElement } = _useOverlay();

  return (
    <OverlayContext.Provider value={{ open }}>
      {children}
      {overlayElement}
    </OverlayContext.Provider>
  );
}

export function useOverlay() {
  const context = useContext(OverlayContext);
  if (!context) {
    throw new Error('useOverlay must be used within an OverlayProvider');
  }
  return context;
}
