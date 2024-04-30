import React, { useState , createContext, useContext } from 'react';
import { InnerWrapper, OuterWrapper } from './style';

interface ModalContextProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalContext = createContext<ModalContextProps | null>(null);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal은 반드시 ModalProvider 안에 있어야합니다.');
  }
  return context;
};

function Modal({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const contextValue = React.useMemo(() => ({ isOpen, setIsOpen }), [isOpen, setIsOpen]);

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
}

function Toggle({ children }: { children: React.ReactNode }) {
  const { setIsOpen } = useModal();
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div onClick={() => setIsOpen(prev => !prev)}>
      {children}
    </div>
  );
}

function Content({ children }: { children: React.ReactNode }) {
  const { isOpen, setIsOpen } = useModal();
  return isOpen ?
    <>
      <OuterWrapper onMouseDown={() => setIsOpen(false)} />
      <InnerWrapper>{children}</InnerWrapper>
    </>
    : null;
}

Modal.Toggle = Toggle;
Modal.Content = Content;

export default Modal;
