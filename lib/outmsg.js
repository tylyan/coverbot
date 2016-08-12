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

module.exports.formatShift = formatShift;