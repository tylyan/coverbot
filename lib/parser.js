/**
 * These functions are responsible for parsing incoming messages sent to the bot.
 */

var formatter = require('./formatter.js');
var validator = require('./validator.js');
var VALID_COMMANDS = ['need', 'cover', 'bump', 'help', 'hi', 'hello'];

/**
 * Parses the command
 * @return appropriate command, error otherwise
 */
function parseCommand(message){
  if (message === null){
    return "error";
  }
  var command = message.split(' ')[0].toLowerCase();
  return VALID_COMMANDS.indexOf(command) === -1 ?
    "error" : command;
}

/**
 * Given a set of valid shift details, returns a Shift object
 * @return A Shift object corresponding to the details
 */
function parseShiftDetails(message){
  if (message === null){
    return null;
  }
  var details = message.split(' ');
  if (details.length !== 6){
    return null;
  }
  // ARC THURSDAY 8/11 11:45am - 3:00pm
  if (!validator.isValidDetails(message)){
    return null;
  }
  var shift = {}
  shift.location = formatter.formatLocation(details[0]);
  shift.dayOfWeek = formatter.formatDayOfWeek(details[1]);
  shift.date = details[2];
  shift.startTime = formatter.formatTime(details[3]);
  shift.endTime = formatter.formatTime(details[5]);
  
  return shift;
}

module.exports = {
  parseCommand: parseCommand,
  parseShiftDetails: parseShiftDetails
}