function formatShift(shift) {
  var message = "";
  message += shift.id + ": ";
  message += shift.location + " ";
  message += shift.dayOfWeek + " ";
  message += shift.date + " ";
  message += shift.startTime + " - ";
  message += shift.endTime;
  return message;
}

function formatShiftList(listOfShifts){
  var message = "";
  listOfShifts.forEach(function(shift){
    message += formatShift(shift) + "\n";
  });
  return message;
}

function formatLocation(location){
  return location.toUpperCase();
}

function formatDayOfWeek(dayOfWeek){
  return dayOfWeek.substring(0, 3).toUpperCase();
}

function formatTime(time){
  var hours, meridiem, index;
  time = time.split(':');
  if (time.length === 2){
    hours = time[0];
    index = time[1].indexOf('a');
    if (index === -1){
      index = time[1].indexOf('p');
    }
    meridiem = time[1].substring(index);
    if (meridiem.length === 1){
      time[1] += 'm';
    }
    return time.join(":");
  } else {
    // 12pm
    hours = parseInt(time);
    index = time[0].indexOf('a');
    if (index === -1){
      index = time[0].indexOf('p');
    }
    meridiem = time[0].substring(index);
    if (meridiem.length === 1){
      meridiem += 'm';
    }
    return hours + ':00' + meridiem;
  }
  
}

/*module.exports.formatShift = formatShift;
module.exports.formatShiftList = formatShiftList;
module.exports.formatLocation = formatLocation;
module.exports.formatDayOfWeek = formatDayOfWeek;*/
module.exports = {
  formatLocation: formatLocation,
  formatDayOfWeek: formatDayOfWeek,
  formatTime: formatTime,
  formatShift: formatShift,
  formatShiftList: formatShiftList
}