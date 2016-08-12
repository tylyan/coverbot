var dotenv = require('dotenv');
var RtmClient = require('@slack/client').RtmClient;
var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;
var MemoryDataStore = require('@slack/client').MemoryDataStore;
var parseShiftDetails = require('./lib/parser.js').parseShiftDetails;
var parseCommand = require('./lib/parser.js').parseCommand;
var formatShift = require('./lib/outmsg.js').formatShift;

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
  console.log('RTM CONNECTION OPENED');
  console.dir(user);
});

/**
 * ABSTRACT THIS INTO FUNCTIONS LATER, EACH COMMAND ETC ETC
 */
rtm.on(RTM_EVENTS.MESSAGE, function(message){
  var user = rtm.dataStore.getUserById(message.user);
  var dm = rtm.dataStore.getDMByName(user.name);
  console.log("Message from ");
  console.dir(user);
  console.log(message);
  var messageText = message.text;
  if (messageText.toLowerCase() === "cover"){
    if (openShifts.length === 0){
      rtm.sendMessage("Sorry there are no open shifts right now! Check again later!", dm.id);
    } else{
      var listOfShifts = "";
      openShifts.forEach(function(shift){
        listOfShifts += formatShift(shift) + "\n";
      });
      rtm.sendMessage("Open shifts:\n" + listOfShifts, dm.id);
    }
  }else{
    var shiftText = messageText.substring(messageText.indexOf(' ') + 1);
    var shift = parseShiftDetails(shiftText);
    shift.owner = user;
    shift.id = openShifts.length;
    openShifts.push(shift);
    rtm.sendMessage("Need Coverage! " + formatShift(shift), dm.id);
  }
});