import { useRef, useEffect, useState } from 'react';
import { MAX_Y, MIN_Y } from '../constant/bottomSheetPosition';

interface BottomSheetMetrics {
  clickStart: {
    sheetY: number;
    clickY: number;
  };
  clickMove: {
    prevClickY?: number;
    movingDirection: 'none' | 'down' | 'up';
  };
  isContentAreaClicked: boolean;
}

export default function useBottomSheet() {
  const [isMouseDown, setIsMouseDown] = useState(false);

  const sheet = useRef<HTMLDivElement>(null);

  const content = useRef<HTMLDivElement>(null);

  const metrics = useRef<BottomSheetMetrics>({
    clickStart: {
      sheetY: 0,
      clickY: 0,
    },
    clickMove: {
      prevClickY: 0,
      movingDirection: 'none',
    },
    isContentAreaClicked: false
  });

  const handleEventEnd = () => {
    if(!sheet.current) return;
    document.body.style.overflowY = 'auto';
    const { clickMove } = metrics.current;
    const currentSheetY = sheet.current!.getBoundingClientRect().y;

    if (currentSheetY !== MIN_Y) {
      if (clickMove.movingDirection === 'down') {
        sheet.current!.style.setProperty('transform', 'translate3D(-50%, 0, 0)');
      }

      if (clickMove.movingDirection === 'up') {
        sheet.current!.style.setProperty('transform', `translate3D(-50%, ${MIN_Y - MAX_Y}px, 0)`);
      }
    }

    metrics.current = {
      clickStart: {
        sheetY: 0,
        clickY: 0,
      },
      clickMove: {
        prevClickY: 0,
        movingDirection: 'none',
      },
      isContentAreaClicked: false
    };
  };

  const handleEventStart = (clientY: number) => {
    if(!sheet.current) return;
    const { clickStart } = metrics.current;
    clickStart.sheetY = sheet.current!.getBoundingClientRect().y;
    clickStart.clickY = clientY;
  };

  const canUserMoveBottomSheet = () => {
    const { clickMove, isContentAreaClicked } = metrics.current;

    if (!isContentAreaClicked) {
      return true;
    }

    if (sheet.current!.getBoundingClientRect().y !== MIN_Y) {
      return true;
    }

    if (clickMove.movingDirection === 'down') {
      return content.current!.scrollTop <= 0;
    }
    return false;
  };

  const handleEventMove = (currentPosition: number) => {
    if(!sheet.current) return;
    const { clickStart, clickMove } = metrics.current;

    if (clickMove.prevClickY === undefined) {
      clickMove.prevClickY = clickStart.clickY;
    }

    if (clickMove.prevClickY === 0) {
      clickMove.prevClickY = clickStart.clickY;
    }

    if (clickMove.prevClickY < currentPosition) {
      clickMove.movingDirection = 'down';
    }

    if (clickMove.prevClickY > currentPosition) {
      clickMove.movingDirection = 'up';
    }

    if (canUserMoveBottomSheet()) {
      const offset = currentPosition - clickStart.clickY;
      let nextSheetY = clickStart.sheetY + offset;

      if (nextSheetY <= MIN_Y) {
        nextSheetY = MIN_Y;
      }

      if (nextSheetY >= MAX_Y) {
        nextSheetY = MAX_Y;
      }

      sheet.current!.style.setProperty('transform', `translate3D(-50%, ${nextSheetY - MAX_Y}px, 0)`);
    } else {
      document.body.style.overflowY = 'hidden';
    }
  };

  useEffect(() => {

    const handleMouseDown = (e: MouseEvent) => {
      setIsMouseDown(true);
      handleEventStart(e.clientY);
    };

    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      handleEventStart(e.touches[0].clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      handleEventMove(e.touches[0].clientY);
    };

    const handleTouchEnd = () => {
      handleEventEnd();
    };

    const firstChild = sheet!.current!.children[0] as HTMLElement;
    firstChild.addEventListener('mousedown', handleMouseDown);
    firstChild.addEventListener('touchstart', handleTouchStart, { passive: false });
    firstChild.addEventListener('touchmove', handleTouchMove);
    firstChild.addEventListener('touchend', handleTouchEnd);
  }, []);

  useEffect(() => {
    const handleMouseUp = () => {
      setIsMouseDown(false);
      handleEventEnd();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if(!isMouseDown) {
        return;
      }
      handleEventMove(e.clientY);
      document.addEventListener('mouseup', handleMouseUp);
    };
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };

  }, [isMouseDown]);

  useEffect(() => {
    const handleClickStart = () => {
      metrics.current!.isContentAreaClicked = true;
    };
    content.current!.addEventListener('mousedown', handleClickStart);
  }, []);

  return { sheet, content };
}
