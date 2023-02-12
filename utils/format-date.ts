const formatDate = (date: Date) => {
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = dateObj.toLocaleString(`en-US`, { month: `long` });
  const day = dateObj.getDate();
  const dayName = dateObj.toLocaleString(`en-US`, { weekday: `long` });
  return `${dayName},\u00A0\u00A0${month}\u00A0\u00A0${day},\u00A0\u00A0${year}`;
};

export default formatDate;
