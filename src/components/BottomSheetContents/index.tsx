import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  Wrapper,
  ReportBtn,
  Label,
  // ReportListWrapper,
  Checkbox,
} from './style';
import ReportList from '../ReportList';
import filterState from '../../recoil/atoms';
import FilterWrapper from '../FilterWrapper';

function Content() {
  const [isChecked, setIsChecked] = useState(false);
  const [currentFilters, setCurrentFilters] = useRecoilState(filterState);

  const handleChange = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    // 필터 값을 전부 isChecked로 맞춘다.
    setCurrentFilters(
      Object.fromEntries(
        Object.entries(currentFilters).map(([key]) => [key, isChecked]),
      ),
    );
  }, [isChecked]);

  return (
    <>
      <Wrapper>
        <Label htmlFor="safetyCheckbox">
          안전시설 모두보기
          <Checkbox
            id="safetyCheckbox"
            type="checkbox"
            checked={isChecked}
            onChange={handleChange}
          />
        </Label>
        <FilterWrapper />
        <ReportBtn type="button">1시간 내 긴급신고</ReportBtn>
      </Wrapper>
      <ReportList />
    </>
  );
}

export default Content;
