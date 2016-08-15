/**
 * An external file to handle all response text.
 * This is to reduce the cluttering of application code.
 */
RESPONSES = {
  "shiftFormatError": "Please make sure the shift details are entered in the correct format separated by spaces! [location] [day of week] [date] [start] - [end]",
  "noShifts": "Sorry there are no open shifts right now! Check again later!",
  "invalidLocation": "Please specify a valid location.",
  "invalidShiftId": "Please specify a valid shift ID!",
  "noShiftsPosted": "You don't have any shifts up for coverage!",
  "invalidCommand": "Sorry I couldn't quite understand you! Please try again.",
  "intro": "Hi I'm coverbot!  You can send direct messages to me regarding shift coverages.\n"
/*          +"Need a shift covered? Send 'need [location] [day of week] [date] [start] - [end]'\n"
          +"Make sure the statement is separated by spaces or I won't be able to understand it.\n"
          +"Want to know what shifts are up for coverage? Send 'cover'."*/
};

module.exports.RESPONSES = RESPONSES;