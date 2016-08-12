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

module.exports.formatShift = formatShift;
module.exports.formatShiftList = formatShiftList;