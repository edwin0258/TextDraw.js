var expect = require("chai").expect;
var TextDraw = require("../build/text-draw.js");

describe('require working', function() {
  it('Should get text-draw.js from the builds folder', function(){
    expect(TextDraw).not.to.be.an('undefined');
  })
})

