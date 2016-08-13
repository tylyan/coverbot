var expect = require('chai').expect;

describe('FORMAT SHIFT DETAILS', function(){
  describe('formatTime', function(){
    var formatTime = require('../lib/formatter.js').formatTime;
    it('should handle single char meridiem', function(){
      expect(formatTime('12:00p')).to.be.equal('12:00pm');
      expect(formatTime('12p')).to.be.equal('12:00pm');
      expect(formatTime('6a')).to.be.equal('6:00am');
      expect(formatTime('6p')).to.be.equal('6:00pm');
    });

    it('should return with double digit minutes', function(){
      expect(formatTime('6:45p')).to.be.equal('6:45pm');
      expect(formatTime('6:45am')).to.be.equal('6:45am');
    })
  })
})