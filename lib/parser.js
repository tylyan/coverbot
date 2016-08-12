var VALID_COMMANDS = ['need', 'cover', 'bump'];
var VALID_LOCATIONS = ['ARC', 'LSM', 'BEST', 'RBHS'];
var DAYS_OF_WEEK = ['SAT', 'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI'];

function parseCommand(message){
  if (message === null){
    return "error";
  }
  var command = message.split(' ')[0].toLowerCase();
  return VALID_COMMANDS.indexOf(command) === -1 ?
    "error" : command;
}

function isValidLocation(location){
  if (location === null || location.length < 3){
    return false;
  }
  return VALID_LOCATIONS.indexOf(location.toUpperCase()) === -1 ? 
    false : true;
}

function isValidDayOfWeek(day){
  if (day === null || day < 3){
    return false;
  }
  var dayOfWeek = day.substring(0, 3).toUpperCase();
  return DAYS_OF_WEEK.indexOf(dayOfWeek) === -1 ?
    false : true;
}

function isValidDetails(details){
  return isValidLocation(details[0]) && isValidDayOfWeek(details[1]);
}

function formatLocation(location){
  return location.toUpperCase();
}

function formatDayOfWeek(dayOfWeek){
  return dayOfWeek.substring(0, 3).toUpperCase();
}

function parseShiftDetails(message){
  if (message === null){
    return null;
  }
  var details = message.split(' ');
  if (details.length !== 6){
    return null;
  }
  // ARC THURSDAY 8/11 11:45am - 3:00pm
  if (!isValidDetails(details)){
    return null;
  }
  var shift = {}
  shift.location = formatLocation(details[0]);
  shift.dayOfWeek = formatDayOfWeek(details[1]);
  shift.date = details[2];
  shift.startTime = details[3];
  shift.endTime = details[5];
  
  return shift;
}

module.exports.parseCommand = parseCommand;
module.exports.isValidLocation = isValidLocation;
module.exports.isValidDayOfWeek = isValidDayOfWeek;
module.exports.parseShiftDetails = parseShiftDetails;