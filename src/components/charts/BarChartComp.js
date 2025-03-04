import React, { useState, useEffect } from "react";
import { BarChart } from "@mui/x-charts";
import { Card, CardContent, FormControl, InputLabel, Select, MenuItem, Stack } from '@mui/material';
import { fetchData, filterDataByPeriod } from '../DataFetcher';

function BarChartComp({ onPeriodChange }) {
  const [period, setPeriod] = useState(7);
  const [chartData, setChartData] = useState({ xAxis: [], series: [] });

  useEffect(() => {
    const initialData = fetchData();
    const filteredData = filterDataByPeriod(initialData, period);
    const newChartData = getChartData(filteredData);
    setChartData(newChartData);
    onPeriodChange(period);
  }, [period]);

  const getChartData = (filteredData) => {
    const xAxis = filteredData.map(item => item.TARIH);
    const leftLoadCounts = filteredData.map(item => item.LEFT_LOAD_COUNT);
    const rightLoadCounts = filteredData.map(item => item.RIGHT_LOAD_COUNT);

    return {
      xAxis,
      series: [
        { id: "left-load-count", data: leftLoadCounts, label: "LEFT LOAD COUNT" },  //data bi array
        { id: "right-load-count", data: rightLoadCounts, label: "RIGHT LOAD COUNT" },
      ],
    };
  };

  const handlePeriodChange = (event) => {
    setPeriod(event.target.value);
  };

  console.log(chartData);
  return (
    <div>
      <Card sx={{ width: "100%" }}>
        <CardContent>
          <Stack sx={{ paddingBottom: "1%" }} spacing={2}>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel id="period-label">Period</InputLabel>
              <Select
                labelId="period-label"
                value={period}
                onChange={handlePeriodChange}
                label="Period"
              >
                <MenuItem value={7}>Last 7 Days</MenuItem>
                <MenuItem value={14}>Last 14 Days</MenuItem>
                <MenuItem value={30}>Last 30 Days</MenuItem>
                <MenuItem value={90}>Last 90 Days</MenuItem>
              </Select>
            </FormControl>
            <BarChart
              xAxis={[{ scaleType: "band", data: chartData.xAxis }]}
              yAxis={[{ min: 0 }]}
              series={chartData.series}
              width={period === 90 ? 1200 : 650}
              height={300}
            />
          </Stack>
        </CardContent>
      </Card>
    </div>
  );
}

export default BarChartComp;
