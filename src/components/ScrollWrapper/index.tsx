import React, { ReactNode, useRef, useState } from 'react';
import Wrapper from './style';

function ScrollWrapper({children}: {children: ReactNode}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDrag, setIsDrag] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const throttle = (func: (...args: any[]) => void, delay: number) => {
    let throttled = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (...args: any[]) => {
      if (!throttled) {
        throttled = true;
        setTimeout(() => {
          func(...args);
          throttled = false;
        }, delay);
      }
    };
  };

  const onDragStart = (e: React.MouseEvent) => {
    if(!scrollRef.current) return;
    e.preventDefault();
    e.stopPropagation();

    setStartX(e.pageX + scrollRef.current.scrollLeft);
    setIsDrag(true);
  };

  const DragEnd = () => {
    setIsDrag(false);
  };

  const onDragMove = (e: React.MouseEvent):void => {
    if(!scrollRef.current || !startX ) return;
    if(isDrag) {
      e.preventDefault();
      e.stopPropagation();
      const {scrollWidth, clientWidth, scrollLeft} = scrollRef.current;
      scrollRef.current.scrollLeft = startX - e.pageX;

      if(scrollLeft === 0) {
        setStartX(e.pageX);
      } else if (scrollWidth <= clientWidth + scrollLeft) {
        setStartX(e.pageX + scrollLeft);
      }
    }
  };

  const delay = 10;
  const onThrottledDragMove = throttle(onDragMove, delay);

  return (
    <Wrapper
      ref={scrollRef}
      onMouseDown={onDragStart}
      onMouseMove={isDrag ? onThrottledDragMove : undefined}
      onMouseUp={DragEnd}
      onMouseLeave={DragEnd}
    >
      {children}
    </Wrapper >
  );
}

export default ScrollWrapper;
