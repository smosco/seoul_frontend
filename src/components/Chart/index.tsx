import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts';
import { transformData } from '../../utils/mapUtils';
import { WaypointInfo, WaypointMean } from '../../types/mapTypes';
import { ChartWrapper, Content, Facility } from './style';

interface ChartProps {
  data: WaypointInfo | WaypointMean | undefined;
  type: 'info' | 'mean';
}

function Chart({ data, type }: ChartProps) {
  const riskData = transformData(data, type);

  return (
    <ChartWrapper>
      <RadarChart width={170} height={130} data={riskData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="risk" tick={{ fontSize: 8 }} />
        <PolarRadiusAxis tick={{ fontSize: 5 }} />
        <Radar
          name="risk-scores"
          dataKey="A"
          stroke="#FF5757"
          fill="#FF5757"
          fillOpacity={0.6}
        />
      </RadarChart>
      <Content>
        {riskData && riskData.length > 0 ? (
          riskData.sort((a,b) => b.A - a.A).slice(0, 3).map((item) => (
            <span key={`${item.A}`}>🚨 주변에 <Facility>{item.risk}</Facility> 이(가) 없습니다!!</span>
          ))
        ) : (
          // TODO : 로딩 중인지, 데이터가 없어서 오류가 난건지 사용자에게 알릴 필요가 있음
          <span>데이터를 불러오는 중입니다...</span>
        )}
      </Content>
    </ChartWrapper>
  );
}

export default Chart;
