var VALID_LOCATIONS = ['ARC', 'LSM', 'BEST', 'RBHS'];
var DAYS_OF_WEEK = ['SAT', 'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI'];

/**
 * Checks to see if location entered is valid
 * @return true if valid, false otherwise
 */
function isValidLocation(location){
  if (location === null || location.length < 3){
    return false;
  }
  return VALID_LOCATIONS.indexOf(location.toUpperCase()) === -1 ? 
    false : true;
}

/**
 * Checks to see if day of week entered is valid
 * @return true if valid, false otherwise
 */
function isValidDayOfWeek(day){
  if (day === null || day < 3){
    return false;
  }
  var dayOfWeek = day.substring(0, 3).toUpperCase();
  return DAYS_OF_WEEK.indexOf(dayOfWeek) === -1 ?
    false : true;
}

/**
 * Checks to see if the date entered is valid
 * @return true if valid, false otherwise
 */
function isValidDate(date){
  if (date === null || date.length === 0){
    return false;
  }
  var dateSplit = date.split('/');
  if (dateSplit.length === 1){
    return false;
  }
  var month = dateSplit[0];
  var day = dateSplit[1];
  if (isNaN(parseInt(month)) || isNaN(parseInt(day))){
    return false;
  }
  month = parseInt(month) - 1;
  day = parseInt(day);
  if (month < 0 || month > 11){
    return false;
  }
  
  if (day < 1 || day > getDaysInMonth(month, new Date().getFullYear())){
    return false;
  }
  return true;
}

/**
 * Helper function to get the number of days in a month
 */
function getDaysInMonth(month, year){
  return new Date(year, month + 1, 0).getDate();
}

/**
 * Checks to see if the time is valid or not
 * @return true if valid, false otherwise
 */
function isValidTime(time){
  if (time === null || time.length === 0){
    return false;
  }
  if (time.indexOf('a') === -1 && time.indexOf('p') === -1){
    return false;
  }
  time = time.split(':');
  var hours;
  var minutes;
  var meridiem;
  if (time.length === 2){
    // 12:30pm
    hours = parseInt(time[0]);
    if (isNaN(hours) || hours < 1 || hours > 12){
      return false;
    }
    minutes = time[1];
    if (minutes.indexOf('p') !== 2 && minutes.indexOf('a') !== 2){
      return false;
    }
    minutes = parseInt(minutes);
    if (isNaN(minutes) || minutes < 0 || minutes > 59){
      return false;
    }
    return true;
  }else if (time.length === 1){
    // 12pm
    hours = parseInt(time[0]);
    if (isNaN(hours) || hours < 1 || hours > 12){
      return false;
    }
    minutes = "00";
    return true;
  } else{
    return false;
  }
}

/**
 * Checks to see if all the shift details are valid
 * @return true if valid, false otherwise
 */
function isValidDetails(details){
  if (details === null){
    return false;
  }
  details = details.split(' ');
  if (details.length !== 6){
    return false;
  }
  return isValidLocation(details[0]) && isValidDayOfWeek(details[1])
      && isValidDate(details[2]) && isValidTime(details[3]) && isValidTime(details[5]);
}

module.exports = {
  isValidLocation: isValidLocation,
  isValidDayOfWeek: isValidDayOfWeek,
  isValidDate: isValidDate,
  isValidTime: isValidTime,
  isValidDetails: isValidDetails
}