import React, { useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import filterState from '../../recoil/atoms';
import { FacilityButton, Wrapper } from './style';

function FilterWrapper() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDrag, setIsDrag] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>();
  const [prevX, setPrevX] = useState<number>(0);
  const [diff, setDiff] = useState<number>(0);
  const [currentFilters, setCurrentFilters] = useRecoilState(filterState);

  const POSITIONTITLE = ['cctv', 'firestation', 'safetyfacility', 'safetycenter', 'emergencybell', 'heatshelter'];

  function traslateToKorean(input: string): string {
    switch (input) {
      case 'cctv':
        return 'CCTV';
      case 'safetyfacility':
        return '안전시설';
      case 'firestation':
        return '소방서';
      case 'heatshelter':
        return '무더위 쉼터';
      case 'safetycenter':
        return '안전센터';
      case 'emergencybell':
        return '비상벨';
      default:
        return '알 수 없는 입력값';
    }
  }

  const handleButtonClick = (e: React.MouseEvent, title: string) => {
    if(diff === 0) {
      setCurrentFilters({
        ...currentFilters,
        [title]: !currentFilters[title],
      });
    }
  };

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
    setPrevX(e.pageX);
    setIsDrag(true);
  };

  const DragEnd = (e: React.MouseEvent) => {
    setIsDrag(false);
    setDiff(Math.abs(prevX - e.pageX));
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
      {POSITIONTITLE.map((position) => (
        <FacilityButton
          key={`facilityBtn_${position}`}
          $isClicked={currentFilters[position]}
          onMouseUp={(e: React.MouseEvent) => handleButtonClick(e, position)}
          type="button"
        >
          {traslateToKorean(position)}
        </FacilityButton>
      ))}
    </Wrapper >
  );
}

export default FilterWrapper;
