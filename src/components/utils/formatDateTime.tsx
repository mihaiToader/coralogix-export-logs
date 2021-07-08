interface DateTime {
  year: number;
  month: number;
  day: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const w0 = (value: number) => {
  if (value < 10) {
    return `0${value}`;
  }
  return `${value}`;
};

const formatDateTime = (dateTime: DateTime) => {
  const { year, month, day, hours, minutes, seconds } = dateTime;
  return `${year}-${w0(month)}-${w0(day)}T${w0(hours)}:${w0(minutes)}:${w0(
    seconds
  )}`;
};

export default formatDateTime;
