import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { POSITIONTITLE } from '../../constant/mockingPositions';
import { FacilityButton, ButtonWrapper, Wrapper, ReportBtn, Label, ReportListWrapper} from './style';
import ReportList from '../ReportList';
import filterState from '../../recoil/atoms';

function Content(){
  const [isChecked, setIsChecked] = useState(false);
  const [currentFilters, setCurrentFilters] = useRecoilState(filterState);

  const handleButtonClick = (title:string) => {
    setCurrentFilters({
      ...currentFilters,
      [title]: !currentFilters[title],
    });
  };

  const handleChange = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    setCurrentFilters(Object.fromEntries(Object.entries(currentFilters).map(([key]) => [key, isChecked])));
  }, [isChecked]);

  function traslateToKorean(input: string): string {
    switch(input) {
      case 'cctv':
        return 'CCTV';
      case 'safetyFacility':
        return '안전시설';
      case 'fireStation':
        return '소방서';
      case 'heatShelter':
        return '무더위 쉼터';
      case 'saftyCenter':
        return '안전센터';
      case 'emergencyBell':
        return '비상벨';
      default:
        return '알 수 없는 입력값';
    }
  }

  return(
    <>
      <Wrapper>
        <Label htmlFor="safetyCheckbox">
          <input
            id="safetyCheckbox"
            type="checkbox"
            checked={isChecked}
            onChange={handleChange}
          />
          안전시설 모두보기
        </Label>
        <ButtonWrapper>
          {POSITIONTITLE.map((position) => (
            <FacilityButton
              key={`facilityBtn_${position}`}
              $isClicked={currentFilters[position]}
              onMouseDown={() => handleButtonClick(position)}
              type='button'
            >
              {(traslateToKorean(position))}
            </FacilityButton>
          ))}
        </ButtonWrapper>
        <ReportBtn type='button'>1시간 내 긴급신고</ReportBtn>
      </Wrapper>
      <ReportListWrapper>
        <ReportList />
      </ReportListWrapper>
    </>
  );
}

export default Content;
