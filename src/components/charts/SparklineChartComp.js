import React, { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Card, CardContent, FormControl, InputLabel, Select, MenuItem, Typography } from "@mui/material";
import { fetchData, filterDataByPeriod } from '../DataFetcher';

export default function LineChartComp() {
  const [period, setPeriod] = useState(7);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const initialData = fetchData();
    const filteredData = filterDataByPeriod(initialData, period);
    const data = filteredData.map(item => ({
      date: item.TARIH,
      verifiedAlarm: item.VERIFIED_ALARM_COUNT,
      enabledAlarm: item.ENABLED_ALARM_COUNT,
      alarm: item.ALARM_COUNT,
    }));
    setChartData(data);
  }, [period]);

  const handlePeriodChange = (event) => {
    setPeriod(event.target.value);
  };

  return (
    <Card sx={{ width: "100%", paddingTop: "1%" }}>
      <CardContent>
        <FormControl fullWidth sx={{ marginBottom: 2, marginTop: 0 }}>
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
        <Stack direction="column" sx={{ width: "100%", paddingTop: "1%" }} spacing={4}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6">Alarm Counts Over Time</Typography>
            <LineChart
              width={1100}
              height={300}
              data={chartData}
              margin={{ top: 20, right: 10, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="alarm" stroke="#b800d8" />
            </LineChart>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6">Enabled Alarm Counts Over Time</Typography>
            <LineChart
              width={1100}
              height={300}
              data={chartData}
              margin={{ top: 20, right: 10, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="enabledAlarm" stroke="#2d96ff" />
            </LineChart>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6">Verified Alarm Counts Over Time</Typography>
            <LineChart
              width={1100}
              height={300}
              data={chartData}
              margin={{ top: 20, right: 10, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="verifiedAlarm" stroke="#06b1af" />
            </LineChart>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}