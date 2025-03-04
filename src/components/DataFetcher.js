import { addDays, format } from 'date-fns';

export const fetchData = () => {
  const data = [];
  const today = new Date();
  const startDate = addDays(today, -89); 

  for (let i = 0; i < 90; i++) {  
    const date = addDays(startDate, i);
    const type1Count = Math.floor(Math.random() * 5);
    const type2Count = Math.floor(Math.random() * 5);
    const type3Count = Math.floor(Math.random() * 5);
    const type4Count = Math.floor(Math.random() * 5);
    const type5Count = Math.floor(Math.random() * 5);
    const type6Count = Math.floor(Math.random() * 5);
    const type7Count = Math.floor(Math.random() * 5);

    const alarmCount = type1Count + type2Count + type3Count + type4Count + type5Count + type6Count + type7Count;

    data.push({
      TASK_ID: i + 1,
      RUN_ID: i + 1,
      TARIH: format(date, 'dd-MM-yyyy'),
      TICKET_ID: i + 100,
      LEFT_LOAD_COUNT: Math.floor(Math.random() * 100),
      RIGHT_LOAD_COUNT: Math.floor(Math.random() * 100),
      ALARM_COUNT: alarmCount,
      TYPE_1_COUNT: type1Count,
      TYPE_2_COUNT: type2Count,
      TYPE_3_COUNT: type3Count,
      TYPE_4_COUNT: type4Count,
      TYPE_5_COUNT: type5Count,
      TYPE_6_COUNT: type6Count,
      TYPE_7_COUNT: type7Count,
      VERIFIED_ALARM_COUNT: Math.floor(Math.random() * 5),
      ENABLED_ALARM_COUNT: Math.floor(Math.random() * 5),
    });
  }
  return data;
};

export const filterDataByPeriod = (data, days) => {
  const today = new Date();
  return data.filter(item => {
    const [day, month, year] = item.TARIH.split('-');
    const formattedDate = new Date(`${year}-${month}-${day}`); // convert to a comparable date object
    return (today - formattedDate) / (1000 * 3600 * 24) <= days;
  });
};