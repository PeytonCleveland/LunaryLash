const formatTime = (time: string) => {
  const hour = time.split(":")[0];
  if (Number(hour) >= 12) {
    const formattedHour = Number(hour) === 12 ? 12 : Number(hour) % 12;
    return `${formattedHour}:${time.split(":")[1]} PM`;
  }
  return `${time.split(":")[0].replace("0", "")}:${time.split(":")[1]} AM`;
};

export default formatTime;
