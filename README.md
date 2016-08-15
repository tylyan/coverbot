# coverbot
v0.1.0
by Tommy Yan

coverbot is a Slack bot for the RU-OIT-Busch team focused on managing the communication of shift coverages between consultants.

**Note:** coverbot is used for means of communication ONLY.  All consultants must STILL manually log in to ZED portal to post/cover shifts.

# Change log

v0.1.0 Bot functionality stable, can parse commands and manipulate coverage data
v0.0.2 Bot able to parse commands and echo appropriate data
v0.0.1 Set up bot to receive incoming messages

# Future Features

- Sort coverage list by time
- Help menu and explanations
- Greeting newly connected users so a Direct Message is opened
- Store coverage data on a database 

# Usage

Simply direct message coverbot with the appropriate commands to interact with coverbot!

# Commands

The following are commands understood by coverbot and his appropriate actions:
  - "need {shift details}"
    - where {shift details} is formatted in the following way: LOCATION DAY DATE START - END
    - For example: ARC THU 8/11 11:45am - 3:00pm
    - The shift details MUST be in this format for now until future releases
  - "cover {} | {location} | {shiftID}"
    - where the argument for cover can be blank, a location, or a shiftID
      - if blank: coverbot will list all open shifts at the moment for all locations
      - if location: coverbot will list all open shifts at the moment for the following location
      - if shiftID: coverbot will consider shift to be covered and remove the shift from the open shifts list and notify the original owner of the shift that their shift has been covered.
  - "bump"
    - coverbot will remind other users via the coverages channel about the requesting user's open shifts
      - if user has no open shifts, then coverbot will reply with "You have no shifts up for coverages at this time!"
  - "hi" or "hello"
    - coverbot will greet the user with a quick introduction
  - "help {command}"
    - coverbot will explain a command in more detail and supply an example

# Examples

I am a consultant and need my Monday BEST 9/12 shift from 8:15am - 11:45am covered!
  1. Send a Direct Message to coverbot: "need BEST MON 9/12 8:15am - 11:45am"
  2. coverbot will announce to the coverage channel: "Need Coverage: BEST MON 9/12 8:15am - 11:45am"
  3. coverbot will also keep track of your open shift until someone covers it
  4. Future: coverbot will remind you if your shift has not been covered

I am a consultant that wants to see what shifts are up for coverage!
  1. Send a Direct Message to coverbot: "cover"
  2. coverbot will reply with a list of open shifts or a message if there are none

I am a consultant that wants to see what shifts are up for coverage at ARC only!
  1. Send a Direct Message to coverbot: "cover arc"
  2. coverbot will reply with a list of open shifts at ARC only or a message if there are none

I am a consultant that likes an open shift that I see and would like to take it!
  1. Take note of the number before the shift, thats the shiftID, for example say the id is 5
  2. Send a Direct Message to coverbot: "cover 5"
  3. coverbot will remove the corresponding shift from his list and also notify the original owner of the shift

I am a consultant who posted a shift and I feel like it was forgotten about!
  1. Send a Direct Message to coverbot: "bump"
  2. coverbot will post a reminder in the coverages channel with all of the shifts you currently have up for coverage
