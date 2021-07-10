const getCurrentDateTime = (date?: Date) => {
  const currentDate = date || new Date();
  return {
    year: currentDate.getFullYear(),
    month: currentDate.getMonth() + 1,
    day: currentDate.getDate(),
    hours: currentDate.getHours(),
    minutes: currentDate.getMinutes(),
    seconds: currentDate.getSeconds(),
  };
};

export default getCurrentDateTime;
