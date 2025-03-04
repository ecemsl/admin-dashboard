import React, { useState, useEffect } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { Card, CardContent, FormControl, InputLabel, Select, MenuItem, Stack, Box, Typography } from '@mui/material';
import { fetchData, filterDataByPeriod } from '../DataFetcher';

export default function PieChartComp() {
  const [period, setPeriod] = useState(7);
  const [data, setData] = useState([]);
  const [alarmCount, setAlarmCount] = useState(0);

  useEffect(() => {
    const initialData = fetchData();
    const filteredData = filterDataByPeriod(initialData, period);
    const chartData = generatePieChartData(filteredData);
    setData(chartData);
  }, [period]);

  const generatePieChartData = (data) => {
    const typeCounts = [0, 0, 0, 0, 0, 0, 0];
    console.log(data);
    data.forEach(item => {
      typeCounts[0] += item.TYPE_1_COUNT;
      typeCounts[1] += item.TYPE_2_COUNT;
      typeCounts[2] += item.TYPE_3_COUNT;
      typeCounts[3] += item.TYPE_4_COUNT;
      typeCounts[4] += item.TYPE_5_COUNT;
      typeCounts[5] += item.TYPE_6_COUNT;
      typeCounts[6] += item.TYPE_7_COUNT;
    });
    const totalAlarmCount = typeCounts.reduce((a, b) => a + b, 0);
    setAlarmCount(totalAlarmCount);
    return typeCounts.map((count, index) => ({  //obje: { id: 0, value: 5, label: 'Type 1' } bunlardan oluşan array döner. 
      id: index,
      value: count,
      label: `Type ${index + 1}`,
    }));
  };

  const handlePeriodChange = (event) => {
    setPeriod(event.target.value);
  };

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
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              <PieChart
                series={[
                  {
                    data,
                    highlightScope: { faded: "global", highlighted: "item" },
                    faded: {
                      innerRadius: 30,
                      additionalRadius: -30,
                      color: "gray",
                    },
                  },
                ]}
                width={460}
                height={255}
              />
            </Box>
            <Typography variant="h6" sx={{ marginTop: 2, marginLeft: 2, textAlign: 'center' }}>
              Total Alarm Count: <span style={{ marginLeft: '50px' , color : 'blue', fontWeight:'600'}}>{alarmCount}</span>
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </div>
  );
}
