interface DateTime {
  year: number;
  month: number;
  day: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const formatDateTime = (dateTime: DateTime) => {
  const { year, month, day, hours, minutes, seconds } = dateTime;
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};

export default formatDateTime;
