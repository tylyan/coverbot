var expect = require('chai').expect;

describe('PARSE MESSAGES', function(){
  
  describe('Parse Command', function(){
    var parseCommand = require('../lib/parser.js').parseCommand;

    it('should parse a need command', function(){
      expect(parseCommand('need asdf')).to.be.equal('need');
    });

    it('should parse a cover command', function(){
      expect(parseCommand('cover asdf')).to.be.equal('cover');
    });

    it('should parse a bump command', function(){
      expect(parseCommand('bump asdf')).to.be.equal('bump');
    });

    it('should return error if any other commands are entered', function(){
      expect(parseCommand('asdf')).to.be.equal('error');
    });
  });
});

describe('PARSE SHIFT DETAILS', function(){

  xdescribe('parseShiftDetails', function(){
    var parseShiftDetails = require('../lib/parser.js').parseShiftDetails;
    var sampleShiftInput;
    before(function(){
      sampleShiftInput = "ARC Thursday 9/11 11:45am - 3:00pm";
    });

    xit('should verify there are four arguments', function(){
      expect(parseShiftDetails(sampleShiftInput)).to.be.equal("ARC THU 9/11 11:45am - 3:00pm");
    });
  });
});