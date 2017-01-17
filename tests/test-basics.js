var expect = require('chai').expect;
var assert = require('chai').assert;
var TextDraw = require('../build/text-draw.js');


function getArrayOfContent(canvas) {
  return [].concat.apply([],canvas.getAllContent());
}

describe('Assert drawing basic things in text-draw works', function() {
  it('should draw a create a canvas', function() {
    var myCanvas = TextDraw.init();
    myCanvas.createCanvas(2,2);
    
    getArrayOfContent(myCanvas).map(x => {
      expect(x.text).to.equal(' ');
      expect(x.styling).to.equal('color:black;');
    });
  });
  
  it('should draw a line on the canvas', function() {
    var myCanvas = TextDraw.init();
    myCanvas.createCanvas(4,4);
    
    myCanvas.line.draw("#",4,1,1,{styling: "color:green;"});
    
    getArrayOfContent(myCanvas).map((x,i) => {
      if(i < 4){
        expect(x.text).to.equal('#');
        expect(x.styling).to.equal('color:green;');
      } else {
        expect(x.text).to.equal(' ');
        expect(x.styling).to.equal('color:black;');
      }
    });
  });
  
  it('should draw a point on the canvas', function() {
    var myCanvas = TextDraw.init();
    myCanvas.createCanvas(4,4);
    
    myCanvas.point.draw("#",2,2,{styling: "background:red;"});
    
    var point = myCanvas.getContent(2,2);
    expect(point.text).to.equal('#');
    expect(point.styling).to.equal('background:red;');
  });
  
  it('should draw a square on the canvas', function() {
    var myCanvas = TextDraw.init();
    myCanvas.createCanvas(5,5);
    
    myCanvas.square.draw("#",3,3,2,2,{styling: "font-size:20px;"});
    //count all positions containing square specifications.
    var count = getArrayOfContent(myCanvas).reduce((a, x) => {
      if(x.text == '#' && x.styling == 'font-size:20px;'){
        return a += 1;
      }
      return a;
    },0);
    expect(count).to.equal(9);
  });
  
  it('should draw some text on the screen', function() {
    var myCanvas = TextDraw.init();
    myCanvas.createCanvas(5,5);
    
    myCanvas.text.draw("Hello",1,1,{styling: "color:red;"});
    var text = getArrayOfContent(myCanvas).reduce((a, x) => {
      if(x.text != ' ' && x.styling != 'color:black;') {
        return a += x.text;
      }
      return a;
    },"");
    expect(text).to.equal('Hello');
  });
})

describe('Throw errors when drawing things outside canvas', function() {
  it('Throws error when line is drawn out of canvas', function() {
    var myCanvas = TextDraw.init();
    myCanvas.createCanvas(3,3);
    
    expect(function(){myCanvas.line.draw("#",4, 10, 10)}).to.throw("Positioning in canvas invalid. Row: 10 Column: 10 not found")
  })
  //More tests coming soon
})