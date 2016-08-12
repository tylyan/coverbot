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

  describe('isValidLocation', function(){
    var isValidLocation = require('../lib/parser.js').isValidLocation;

    it('should parse ARC location', function(){
      expect(isValidLocation('ARC')).to.be.true;
      expect(isValidLocation('arc')).to.be.true;
    });

    it('should parse LSM location', function(){
      expect(isValidLocation('LSM')).to.be.true;
      expect(isValidLocation('lsm')).to.be.true;
    });

    it('should parse BEST location', function(){
      expect(isValidLocation('BEST')).to.be.true;
      expect(isValidLocation('best')).to.be.true;
    });

    it('should parse RBHS location', function(){
      expect(isValidLocation('RBHS')).to.be.true;
      expect(isValidLocation('rbhs')).to.be.true;
    });

    it('should return error if any other location is entered', function(){
      expect(isValidLocation('ABC')).to.be.false;
    });
  });

  describe('isValidDayOfWeek', function(){
    var isValidDayOfWeek = require('../lib/parser.js').isValidDayOfWeek;

    it('should parse SAT', function(){
      expect(isValidDayOfWeek('saturday')).to.be.true;
      expect(isValidDayOfWeek('sat')).to.be.true;
    });

    it('should parse SUN', function(){
      expect(isValidDayOfWeek('sunday')).to.be.true;
      expect(isValidDayOfWeek('Sunday')).to.be.true;
    });

    it('should parse MON', function(){
      expect(isValidDayOfWeek('monday')).to.be.true;
      expect(isValidDayOfWeek('mon')).to.be.true;
    });

    it('should parse TUE', function(){
      expect(isValidDayOfWeek('tuesday')).to.be.true;
      expect(isValidDayOfWeek('tue')).to.be.true;
    });

    it('should parse WED', function(){
      expect(isValidDayOfWeek('wednesday')).to.be.etrue;
      expect(isValidDayOfWeek('WED')).to.be.true;
    });

    it('should parse THU', function(){
      expect(isValidDayOfWeek('Thursday')).to.be.true;
      expect(isValidDayOfWeek('thurs')).to.be.true;
    });

    it('should parse FRI', function(){
      expect(isValidDayOfWeek('friday')).to.be.true;
      expect(isValidDayOfWeek('fri')).to.be.true;
    });

    it('should return error if any other day of week is entered', function(){
      expect(isValidDayOfWeek('sit')).to.be.false;
    });
  });

  xdescribe('isValidDate', function(){
    var isValidDate = require('../lib/parser.js').isValidDate;

    it('should check for valid month', function(){
      expect(isValidDate('13/31')).to.be.false;
      expect(isValidDate('6/31')).to.be.true;
    });

    it('should check for valid day', function(){
      expect(isValidDate('11/33')).to.be.false;
      expect(isValidDate('6/31')).to.be.true;
    });
  });

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