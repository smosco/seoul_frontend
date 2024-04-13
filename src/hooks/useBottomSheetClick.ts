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

export default function useBottomSheetClick() {
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

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      setIsMouseDown(true);
      const { clickStart } = metrics.current;
      clickStart.sheetY = sheet.current!.getBoundingClientRect().y;
      clickStart.clickY = e.clientY;
    };


    sheet.current!.addEventListener('mousedown', handleMouseDown);
  }, []);

  useEffect(() => {
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

    const handleMouseUp = () => {
      setIsMouseDown(false);
      document.body.style.overflowY = 'auto';
      const { clickMove } = metrics.current;

      const currentSheetY = sheet.current!.getBoundingClientRect().y;

      if (currentSheetY !== MIN_Y) {
        if (clickMove.movingDirection === 'down') {
          sheet.current!.style.setProperty('transform', 'translate3D(0, 0, 0)');
        }

        if (clickMove.movingDirection === 'up') {
          sheet.current!.style.setProperty('transform', `translate3D(0, ${MIN_Y - MAX_Y}px, 0)`);
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

    const handleMouseMove = (e: MouseEvent) => {
      if(!isMouseDown) {
        return;
      }
      const { clickStart, clickMove } = metrics.current;
      const currentMousePosition = e.clientY;

      if (clickMove.prevClickY === undefined) {
        clickMove.prevClickY = clickStart.clickY;
      }

      if (clickMove.prevClickY === 0) {
        clickMove.prevClickY = clickStart.clickY;
      }

      if (clickMove.prevClickY < currentMousePosition) {
        clickMove.movingDirection = 'down';
      }

      if (clickMove.prevClickY > currentMousePosition) {
        clickMove.movingDirection = 'up';
      }

      if (canUserMoveBottomSheet()) {
        e.preventDefault();

        const mouseOffset = currentMousePosition - clickStart.clickY;
        let nextSheetY = clickStart.sheetY + mouseOffset;

        if (nextSheetY <= MIN_Y) {
          nextSheetY = MIN_Y;
        }

        if (nextSheetY >= MAX_Y) {
          nextSheetY = MAX_Y;
        }

        sheet.current!.style.setProperty('transform', `translate3D(0, ${nextSheetY - MAX_Y}px, 0)`);
      } else {
        document.body.style.overflowY = 'hidden';
      }
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
