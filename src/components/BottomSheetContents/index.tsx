import React, { useState } from 'react';
import POSITIONS from '../../constant/mockingPositions';

function Content(){
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    setIsChecked(!isChecked);
  };

  function traslateToKorean(input: string): string {
    let output: string;

    switch(input) {
      case 'cctv':
        output = 'CCTV';
        break;
      case 'safetyFacility':
        output = '안전시설';
        break;
      case 'fireStation':
        output = '소방서';
        break;
      case 'heatShelter':
        output = '무더위 쉼터';
        break;
      case 'saftyCenter':
        output = '안전센터';
        break;
      case 'emergencyBell':
        output = '비상벨';
        break;
      default:
        output = '알 수 없는 입력값';
    }

    return output;
  }


  return(
    <div>
      <label htmlFor="safetyCheckbox">
        <input
          id="safetyCheckbox"
          type="checkbox"
          checked={isChecked}
          onChange={handleChange}
        />
        안전시설 모두보기
      </label>
      {POSITIONS.map((position) => (
        <button type='button'>{(traslateToKorean(position.title))}</button>
      ))}
      <button type='button'>1시간 내 긴급신고</button>
    </div>
  );
}

export default Content;
