const formatDate = (date: Date) => {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = dateObj.toUTCString().split(` `)[2];
  const day = dateObj.getUTCDate();
  const dayName = weekday[dateObj.getUTCDay()];
  return `${dayName},\u00A0\u00A0${month}\u00A0\u00A0${day},\u00A0\u00A0${year}`;
};

export default formatDate;
