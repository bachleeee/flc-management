exports.convertDayOfWeekToNumber = (dayOfWeek) => {
    switch (dayOfWeek.toLowerCase()) {
      case "hai":
        return 1;
      case "ba":
        return 2;
      case "tư":
        return 3;
      default:
        return -1; 
    }
  };
  