var expect = require('chai').expect;

describe('VALIDATORS', function(){
  describe('isValidLocation', function(){
    var isValidLocation = require('../lib/validator.js').isValidLocation;

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
    var isValidDayOfWeek = require('../lib/validator.js').isValidDayOfWeek;

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

  describe('isValidDate', function(){
    var isValidDate = require('../lib/validator.js').isValidDate;

    it('should check for correct format', function(){
      expect(isValidDate('12-13')).to.be.false;
    });

    it('should check for valid month', function(){
      expect(isValidDate('13/15')).to.be.false;
      expect(isValidDate('6/15')).to.be.true;
    });

    it('should check for valid day', function(){
      expect(isValidDate('11/33')).to.be.false;
      expect(isValidDate('6/31')).to.be.false;
      expect(isValidDate('9/33')).to.be.false;
      expect(isValidDate('9/31')).to.be.false;
      expect(isValidDate('6/30')).to.be.true;
    });
  });

  describe('isValidTime', function(){
    var isValidTime = require('../lib/validator.js').isValidTime;

    it('should check for valid format', function(){
      expect(isValidTime('12')).to.be.false;
      expect(isValidTime('12:33')).to.be.false;
      expect(isValidTime('12:30pm')).to.be.true;
      expect(isValidTime('12pm')).to.be.true;
      expect(isValidTime('5p')).to.be.true;
      expect(isValidTime('5a')).to.be.true;
      expect(isValidTime('12:30:30pm')).to.be.false;
    });

    it('should check for valid hours', function(){
      expect(isValidTime('12pm')).to.be.true;
      expect(isValidTime('12am')).to.be.true;
      expect(isValidTime('13pm')).to.be.false;
      expect(isValidTime('13:00pm')).to.be.false;
      expect(isValidTime('1:00pm')).to.be.true;
    });

    it('should check for valid minutes', function(){
      expect(isValidTime('12:0pm')).to.be.false;
      expect(isValidTime('12:70pm')).to.be.false;
      expect(isValidTime('12:50pm')).to.be.true;
    })
  });

  describe('isValidDetails', function(){
    var isValidDetails = require('../lib/validator.js').isValidDetails;
    var correctDetails;
    var incorrectDetails;
    var incorrectFormat;
    var noFormat;
    before(function(){
      correctDetails = "ARC MON 9/3 12:45pm - 6:30pm";
      incorrectDetails = "ARC MON 9/31 12:45pm - 6:30pm";
      incorrectFormat = "MON ARC 9/3 12:45pm - 6:30pm"
      noFormat = "asdf asdf";
    })
    it('should check for the correct format of arguments', function(){
      expect(isValidDetails(incorrectFormat)).to.be.false;
      expect(isValidDetails(correctDetails)).to.be.true;
      expect(isValidDetails(noFormat)).to.be.false;
    })
  })
});