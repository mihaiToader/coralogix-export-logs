const getCurrentDateTime = () => {
  const currentDate = new Date();
  return {
    year: currentDate.getFullYear(),
    month: currentDate.getMonth(),
    day: currentDate.getDay(),
    hours: currentDate.getHours(),
    minutes: currentDate.getMinutes(),
    seconds: currentDate.getSeconds(),
  };
};

export default getCurrentDateTime;
