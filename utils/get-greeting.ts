const getGreeting = () => {
  const dateObj = new Date();
  const time = dateObj.getHours();
  if (time < 12) {
    return "Good Morning,";
  } else if (time >= 12 && time < 17) {
    return "Good Afternoon,";
  } else {
    return "Good Evening,";
  }
};

export default getGreeting;
