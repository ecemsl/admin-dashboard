import React, { useState } from "react";
import BarChartComp from "../components/charts/BarChartComp";
import PieChartComp from "../components/charts/PieChartComp";
import Stack from "@mui/material/Stack";
import HeaderComp from "../components/HeaderComp";
import SidebarComp from "../components/SidebarComp";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import SparklineChartComp from "../components/charts/SparklineChartComp";
import StatsCard from "../components/charts/StatsCard";

function DashboardPage() {
  const [isExpanded, setIsExpanded] = useState(false);

  const handlePeriodChange = (period) => {
    setIsExpanded(period === 90);
  };

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: (theme) =>
          theme.palette.mode === "light" ? "#f5f5f5" : "#0f0f0f",
      }}
    >
      <CssBaseline />
      <HeaderComp />
      <SidebarComp />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginTop: "64px",
          backgroundColor: "transparent",
        }}
      >
        <Stack direction="column">
          <Stack direction="column">
            <Stack
              sx={{ marginTop: "1%", marginLeft: "0%", width: "200%" }}
              direction="row"
              spacing={2}
            >
              <BarChartComp onPeriodChange={handlePeriodChange} />
              {!isExpanded && <PieChartComp />}
            </Stack>
            <Stack sx={{ marginTop: "1%", marginLeft: "0%", width: "100%" }}>
              <SparklineChartComp />
            </Stack>
          </Stack>
          <Stack sx={{ marginTop: "1%", marginLeft: "0%", width: "100%" }}>
            <StatsCard />
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}

export default DashboardPage;
