var expect = require('chai').expect;
var TextDraw = require('../build/text-draw.js');

var myCanvas = TextDraw.init();

describe('Test test draw basics', function() {
  it('should draw a create a canvas', function() {
    myCanvas.createCanvas(2,2);
    myCanvas.fillCanvas("#")
    console.log(myCanvas.logCanvas({display_color: false}))
    expect(myCanvas.drawCanvas()).to.equal("<span style='color:black;'>#</span><span style='color:black;'>#</span> \n<span style='color:black;'>#</span><span style='color:black;'>#</span>")
  })
  it('should draw a line on the canvas', function() {
    
  })
  it('should draw a point on the canvas', function() {
    
  })
  it('should draw a square on the canvas', function() {
    
  })
  it('should draw some text on the screen', function() {
    
  })
})