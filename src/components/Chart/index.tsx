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

interface ChartProps {
  data: WaypointInfo | undefined;
}

function Chart({ data }: ChartProps) {
  const riskData = transformData(data);
  return (
    <RadarChart width={200} height={200} data={riskData}>
      <PolarGrid />
      <PolarAngleAxis dataKey="subject" />
      <PolarRadiusAxis />
      <Radar
        name="Scores"
        dataKey="A"
        stroke="#8884d8"
        fill="#8884d8"
        fillOpacity={0.6}
      />
    </RadarChart>
  );
}

export default Chart;
