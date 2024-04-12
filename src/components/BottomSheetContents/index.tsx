import React, { useEffect, useState } from 'react';
import POSITIONS from '../../constant/mockingPositions';
import { FacilityButton, ButtonWrapper, Wrapper, ReportBtn, Label} from './style';

function Content(){
  const [isChecked, setIsChecked] = useState(false);
  const [isClicked, setIsClicked] = useState(new Array(POSITIONS.length).fill(false));

  const handleButtonClick = (index: number) => {
    const newIsClicked = [...isClicked];
    newIsClicked[index] = !newIsClicked[index];
    setIsClicked(newIsClicked);
  };

  const handleChange = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    setIsClicked(new Array(POSITIONS.length).fill(isChecked));
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
        {POSITIONS.map((position, index) => (
          <FacilityButton
            key={`facilityBtn_${position.title}`}
            isClicked={isClicked[index]}
            onClick={() => handleButtonClick(index)}
            type='button'
          >
            {(traslateToKorean(position.title))}
          </FacilityButton>
        ))}
      </ButtonWrapper>
      <ReportBtn type='button'>1시간 내 긴급신고</ReportBtn>
    </Wrapper>
  );
}

export default Content;
