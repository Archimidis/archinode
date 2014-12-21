'use strict';

var expect = require('chai').expect;
var sinon = require('sinon');

describe('Something', function() {
  it('should pass', function() {
    var callback = sinon.stub().returns(true);
    expect(callback()).to.be.true;
  });
});
