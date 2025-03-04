import HeaderComp from "../components/HeaderComp";
import dayjs from "dayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Box, Toolbar } from "@mui/material";
import SidebarComp from "../components/SidebarComp";

function CalendarPage() {
  const today = new Date();
  return (
    <Box sx={{ display: 'flex' }}>
      <HeaderComp />
      <SidebarComp />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: '10px' }}>
        <Toolbar />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateCalendar"]}>
            <DateCalendar
              referenceDate={dayjs(today)}
              views={["year", "month", "day"]}
            />
          </DemoContainer>
        </LocalizationProvider>
      </Box>
    </Box>
  );
}

export default CalendarPage;