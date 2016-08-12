var dotenv = require('dotenv');
var RtmClient = require('@slack/client').RtmClient;
var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;
var MemoryDataStore = require('@slack/client').MemoryDataStore;
var parseShiftDetails = require('./lib/parser.js').parseShiftDetails;
var parseCommand = require('./lib/parser.js').parseCommand;
var formatShift = require('./lib/outmsg.js').formatShift;
var formatShiftList = require('./lib/outmsg.js').formatShiftList;
var parser = require('./lib/parser.js');

// Load environmental variables
dotenv.load();
var token = process.env.SLACKBOT_API_TOKEN || '';

var openShifts = [];

var rtm = new RtmClient(token, {
  logLevel: 'error',
  dataStore: new MemoryDataStore()});
rtm.start();

rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, function(rtmStartData){
  console.log('Logged in as ' + rtmStartData.self.name + ' of team ' + rtmStartData.team.name + ', but not yet connected to any channels.');
  var yuky = rtmStartData.users.filter(function(user){
    return user.id === 'U1T4BQJE8';
  })[0];
  //console.dir(yuky);
});

rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, function(){
  var user = rtm.dataStore.getUserByName('yuky');
  /*console.log('RTM CONNECTION OPENED');
  console.dir(user);*/
});

/**
 * ABSTRACT THIS INTO FUNCTIONS LATER, EACH COMMAND ETC ETC
 */
rtm.on(RTM_EVENTS.MESSAGE, function(message){
  var user = rtm.dataStore.getUserById(message.user);
  var dm = rtm.dataStore.getDMByName(user.name);
  var response = "";
  /*console.log("Message from ");
  console.dir(user);
  console.log(message);*/
  /* Get message text */
  var messageText = message.text;
  /* Get the command */
  var command = parseCommand(messageText.split(' ')[0]);
  if (command === "need") /* NEEDS COVERAGE */
  {
    var shiftText = messageText.substring(messageText.indexOf(' ') + 1);
    var shift = parseShiftDetails(shiftText);
    shift.owner = user.name.toLowerCase();
    shift.id = openShifts.length;
    openShifts.push(shift);
    response = "Need Coverage!\n" + formatShift(shift);
    rtm.sendMessage(response, dm.id);
  }
  else if (command === "cover") /* COVER OR CHECK OPEN SHIFTS */
  {
    if (messageText.split(' ').length === 1) /* CHECKING OPEN SHIFTS */
    {
      if (openShifts.length === 0) /* NO OPEN SHIFTS */
      {
        response = "Sorry there are no open shifts right now! Check again later!";
        rtm.sendMessage(response, dm.id);
      } 
      else /* SEND LIST OF OPEN SHIFTS TO REQUESTING USER */
      {
        response = "Open shifts:\n" + formatShiftList(openShifts);
        rtm.sendMessage(response, dm.id);
      }
    } 
    else /* COVER + ARGUMENT */
    {
      var arg = messageText.split(' ')[1];
      if (isNaN(parseInt(arg))) /* ARG IS A STRING */
      {
        if (!parser.isValidLocation(arg)) /* NOT A VALID LOCATION */
        {
          response = "Please specify a valid location.";
          rtm.sendMessage(response, dm.id);
        }
        else
        {
          //var listByLoc = openShifts.refineList(null, arg);
          var listByLoc = openShifts.filter(function(shift){
            return shift.location === arg.toUpperCase();
          });

          if (listByLoc.length === 0){
            response = "Sorry there are no open shifts for " + arg.toUpperCase();
            rtm.sendMessage(response, dm.id);
          } else {
            response = "Open shifts at " + arg.toUpperCase() + ":\n";
            response += formatShiftList(listByLoc);
            rtm.sendMessage(response, dm.id);
          }
        }
      }
      else /* ARG IS AN INTEGER */
      {
        var wantId = parseInt(arg);
        if (wantId > openShifts.length - 1){
          response = "Please specify a valid shift ID!";
          rtm.sendMessage(response, dm.id);
        } else {
          var coverShift = openShifts.filter(function(shift){
            return shift.id === wantId;
          })[0];
          response = "Covering:\n" + formatShift(coverShift);
          rtm.sendMessage(response, dm.id);
        }
      }
      
    }
  }
  else if (command === "bump") /* BUMP POSTED SHIFTS */
  {
    var bumpList = openShifts.filter(function(shift){
      return shift.owner === user;
    });
    if (bumpList.length === 0){
      rtm.sendMessage("You don't have any shifts up for coverage!");
    } else{
      var message = formatShiftList(bumpList);
      rtm.sendMessage("Bumping:\n" + message, dm.id);
    }
  }
  else /* NONE OF THE ABOVE COMMANDS */
  {
    rtm.sendMessage("Sorry I couldn't quite understand you! Please try again.", dm.id);
  }
});

Array.prototype.refineList = function(user, location) {
  var refinedList = this.forEach(function(item){
    if (user){
      return item.owner === user.toLowerCase();
    }else {
      return item.location === location.toUpperCase();
    }
  });
  return refinedList;
}