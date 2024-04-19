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
import { WaypointInfo } from '../../types/mapTypes';
import { ChartWrapper, Content } from './style';

interface ChartProps {
  data: WaypointInfo | undefined;
}

function Chart({ data }: ChartProps) {
  const riskData = transformData(data);

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
        <p>cctv가 별로 없어요</p>
        <p>안전시설이 멀어요</p>
        <p>더위 쉼터가 없어요</p>
      </Content>
    </ChartWrapper>
  );
}

export default Chart;
