var dotenv = require('dotenv');
var RtmClient = require('@slack/client').RtmClient;
var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;
var MemoryDataStore = require('@slack/client').MemoryDataStore;
var formatter = require('./lib/formatter.js');
var parser = require('./lib/parser.js');
var validator = require('./lib/validator.js');
var shiftUtils = require('./lib/shiftUtils.js');
var RESPONSES = require('./responses.js').RESPONSES;

// Load environmental variables
dotenv.load();
var token = process.env.SLACKBOT_API_TOKEN || '';

var openShifts = [];

/**
 * Set up and start the RTM client.
 */
var rtm = new RtmClient(token, {
  logLevel: 'error',
  dataStore: new MemoryDataStore()});
rtm.start();

rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, function(rtmStartData){
  console.log('Logged in as ' + rtmStartData.self.name + ' of team ' + rtmStartData.team.name + ', but not yet connected to any channels.');
  var yuky = rtmStartData.users.filter(function(user){
    return user.id === 'U1T4BQJE8';
  })[0];
});

rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, function(){
  var user = rtm.dataStore.getUserByName('yuky');
  /*console.log('RTM CONNECTION OPENED');
  console.dir(user);*/
});

/**
 * On message received, handle commands.
 * ABSTRACT THIS INTO FUNCTIONS LATER, EACH COMMAND ETC ETC
 */
rtm.on(RTM_EVENTS.MESSAGE, function(message){
  var user = rtm.dataStore.getUserById(message.user);
  var dm = rtm.dataStore.getDMByName(user.name);
  var response = "";
  var messageText = message.text;
  /* Get the command */
  var command = parser.parseCommand(messageText.split(' ')[0]);
  if (command === "need") /* NEEDS COVERAGE */
  {
    var shiftText = messageText.substring(messageText.indexOf(' ') + 1);
    var shift = parser.parseShiftDetails(shiftText);
    if (shift === null){
      response = RESPONSES.shiftFormatError;
      rtm.sendMessage(response, dm.id);
    }else{
      shift.owner = user.name.toLowerCase();
      shift.id = openShifts.length;
      openShifts.push(shift);
      response = "Need Coverage!\n" + formatter.formatShift(shift);
      rtm.sendMessage(response, dm.id);
    }
  }
  else if (command === "cover") /* COVER OR CHECK OPEN SHIFTS */
  {
    if (messageText.split(' ').length === 1) /* CHECKING OPEN SHIFTS */
    {
      if (openShifts.length === 0) /* NO OPEN SHIFTS */
      {
        response = RESPONSES.noShifts;
        rtm.sendMessage(response, dm.id);
      } 
      else /* SEND LIST OF OPEN SHIFTS TO REQUESTING USER */
      {
        response = "Open shifts:\n" + formatter.formatShiftList(openShifts);
        rtm.sendMessage(response, dm.id);
      }
    } 
    else /* COVER + ARGUMENT */
    {
      var arg = messageText.split(' ')[1];
      if (isNaN(parseInt(arg))) /* ARG IS A STRING */
      {
        if (!validator.isValidLocation(arg)) /* NOT A VALID LOCATION */
        {
          response = RESPONSES.invalidLocation;
          rtm.sendMessage(response, dm.id);
        }
        else
        {
          //var listByLoc = shiftUtils.refineListByLocation(openShifts, arg);
          var listByLoc = openShifts.filter(function(shift){
            return shift.location === arg.toUpperCase();
          });

          if (listByLoc.length === 0){
            response = "Sorry there are no open shifts for " + arg.toUpperCase();
            rtm.sendMessage(response, dm.id);
          } else {
            response = "Open shifts at " + arg.toUpperCase() + ":\n";
            response += formatter.formatShiftList(listByLoc);
            rtm.sendMessage(response, dm.id);
          }
        }
      }
      else /* ARG IS AN INTEGER */
      {
        var wantId = parseInt(arg) - 1;
        if (wantId < 0 || wantId > openShifts.length - 1){
          response = RESPONSES.invalidShiftId;
          rtm.sendMessage(response, dm.id);
        } else {
          /*var coverShift = openShifts.filter(function(shift){
            return shift.id === wantId;
          })[0];*/
          var coverShift = shiftUtils.coverShiftById(openShifts, wantId);
          var shiftOwner = coverShift.owner;
          var coverDm = rtm.dataStore.getDMByName(shiftOwner);
          response = "Covering " + shiftOwner + ":\n" + formatter.formatShift(coverShift);
          var response2 = "Your shift has been covered!";
          openShifts = shiftUtils.updateShiftIds(openShifts);
          rtm.sendMessage(response, dm.id);
          rtm.sendMessage(response2, coverDm.id);
        }
      }
      
    }
  }
  else if (command === "bump") /* BUMP POSTED SHIFTS */
  {
    var bumpList = openShifts.filter(function(shift){
      return shift.owner === user.name.toLowerCase();
    });
    //var bumpList = shiftUtils.refineListByUser(openShifts, user);
    if (bumpList.length === 0){
      response = RESPONSES.noShiftsPosted;
      rtm.sendMessage(response, dm.id);
    } else{
      var message = formatter.formatShiftList(bumpList);
      rtm.sendMessage("Bumping:\n" + message, dm.id);
    }
  }
  else if (command === "hi" || command === "hello" || command === "help" )
  {
    response = RESPONSES.intro;
    rtm.sendMessage(response, dm.id);
  } else if (/*help*/){

  }
  else/* NONE OF THE ABOVE COMMANDS */
  {
    response = RESPONSES.invalidCommand;
    rtm.sendMessage(response, dm.id);
  }
});