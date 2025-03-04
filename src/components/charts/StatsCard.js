import React, { useState } from "react";
import { Card, CardContent, Typography, Grid, IconButton, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { fetchData } from "../DataFetcher";

export default function StatsCard() {
  const data = fetchData();
  const [cards, setCards] = useState([{ selectedDate: null, selectedData: null }]);

  const handleDateChange = (newDate, index) => {
    const date = newDate ? dayjs(newDate).format('DD-MM-YYYY') : '';
    const updatedCards = [...cards];
    updatedCards[index].selectedDate = date;
    updatedCards[index].selectedData = data.find(item => item.TARIH === date); //obje döner
    setCards(updatedCards);

  };
  const addCard = () => {
    setCards([...cards, { selectedDate: null, selectedData: null }]);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container spacing={3}>
        {cards.map((card, index) => (
          <Grid item xs={12} sm={cards.length === 1 ? 12 : 6} md={cards.length > 2 ? 6 : 6} key={index}>
            <Card sx={{ padding: 2, position: "relative" }}>
              {index === 0 && (
                <IconButton
                  onClick={addCard}
                  sx={{ position: "absolute", top: 8, right: 8 }}
                >
                  <AddIcon />
                </IconButton>
              )}
              <CardContent>
                <Typography variant="h6" sx={{ marginBottom: 2 }}>
                  Device Stats
                </Typography>
                <DatePicker
                  label="Select Date"
                  value={card.selectedDate ? dayjs(card.selectedDate, 'DD-MM-YYYY') : null}                  
                  onChange={(newDate) => handleDateChange(newDate, index)}
                  renderInput={(params) => <TextField {...params} fullWidth sx={{ marginBottom: 2 }} />}
                />
                {card.selectedData ? (
                  <Grid container spacing={2}>
                    <Grid item xs={6} sx={{ textAlign: 'left' }}>
                      <Typography>Run ID:</Typography>
                      <Typography>Date:</Typography>
                      <Typography>Ticket ID:</Typography>
                      <Typography>Left Load Count:</Typography>
                      <Typography>Right Load Count:</Typography>
                      <Typography>Alarm Count:</Typography>
                      <Typography>Type 1 Count:</Typography>
                      <Typography>Type 2 Count:</Typography>
                      <Typography>Type 3 Count:</Typography>
                      <Typography>Type 4 Count:</Typography>
                      <Typography>Type 5 Count:</Typography>
                      <Typography>Type 6 Count:</Typography>
                      <Typography>Type 7 Count:</Typography>
                      <Typography>Verified Alarm Count:</Typography>
                      <Typography>Enabled Alarm Count:</Typography>
                    </Grid>
                    <Grid item xs={6} sx={{ textAlign: 'right' }}>
                      <Typography color={"blue"} fontWeight={"1000"}>{card.selectedData.RUN_ID}</Typography>
                      <Typography color={"blue"} fontWeight={"1000"}>{card.selectedData.TARIH}</Typography>
                      <Typography color={"blue"} fontWeight={"1000"}>{card.selectedData.TICKET_ID}</Typography>
                      <Typography color={"blue"} fontWeight={"1000"}>{card.selectedData.LEFT_LOAD_COUNT}</Typography>
                      <Typography color={"blue"} fontWeight={"1000"}>{card.selectedData.RIGHT_LOAD_COUNT}</Typography>
                      <Typography color={"blue"} fontWeight={"1000"}>{card.selectedData.ALARM_COUNT}</Typography>
                      <Typography color={"blue"} fontWeight={"1000"}>{card.selectedData.TYPE_1_COUNT}</Typography>
                      <Typography color={"blue"} fontWeight={"1000"}>{card.selectedData.TYPE_2_COUNT}</Typography>
                      <Typography color={"blue"} fontWeight={"1000"}>{card.selectedData.TYPE_3_COUNT}</Typography>
                      <Typography color={"blue"} fontWeight={"1000"}>{card.selectedData.TYPE_4_COUNT}</Typography>
                      <Typography color={"blue"} fontWeight={"1000"}>{card.selectedData.TYPE_5_COUNT}</Typography>
                      <Typography color={"blue"} fontWeight={"1000"}>{card.selectedData.TYPE_6_COUNT}</Typography>
                      <Typography color={"blue"} fontWeight={"1000"}>{card.selectedData.TYPE_7_COUNT}</Typography>
                      <Typography color={"blue"} fontWeight={"1000"}>{card.selectedData.VERIFIED_ALARM_COUNT}</Typography>
                      <Typography color={"blue"} fontWeight={"1000"}>{card.selectedData.ENABLED_ALARM_COUNT}</Typography>
                    </Grid>
                  </Grid>
                ) : (
                  <Typography sx={{ marginTop: 2 }}>
                    {cards.length > 1 ? "Please select two dates to compare them side by side." : "Please select a date to view the stats."}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </LocalizationProvider>
  );
}