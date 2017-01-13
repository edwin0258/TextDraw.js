this.TextDraw = TextDraw();

function TextDraw(){
  let canvas = [];
  let width = 0;
  let height = 0;
  
  //Master functions
  function createCanvas(x,y) {
    width = x;
    height = y;
    canvas = [...Array(height)].map(x => [...Array(width)].map(x => " "));
  }
  
  function drawCanvas() {
    console.log(canvas.map(x => x.join('')).join(" \n"));
  }
  
  //Drawing types
  let line = {
    character: "@",
    char_count: 4, //length of line
    x_pos: 0,
    y_pos: 0,
    draw: function(char = "@", l = 4, y = 1, x = 1) {
      //DRAW - character, length, y_position, x_position
      function init() {
        this.character = char;
        this.char_count = l;
        if(x <= width && y <= height && x > 0 && y > 0) {
          this.x_pos = x - 1; // row 2 will be row 2 instead of row 3.
          this.y_pos = y - 1;
        } else {
          throw Error("Positioning in canvas invalid. Row: " + y + " Column: " + x + " not found");
        }
      }
      
      
      function place() {
        canvas[this.y_pos].splice(this.x_pos,this.char_count - 1);
        canvas[this.y_pos][this.x_pos] = [...Array(this.char_count)].map(i => this.character);
        canvas[this.y_pos] = canvas[this.y_pos].reduce((m,n) => [...m, ...n]);
      }
      
      init.apply(this);
      place.apply(this);
    }
  }
  
  let square = {
    character: "@",
    square_width: 4,
    square_height: 4,
    x_pos: 0,
    y_pos: 0,
    draw: function(char = "@", w = 4, h = 4, y = 1, x = 1) {
      //DRAW - character, width, height, y_position, x_position
      function init() {
        this.character = char;
        this.square_width = w;
        this.square_height = h;
        if(x <= width && y <= height) {
          this.x_pos = x;
          this.y_pos = y;
        } else {
          throw Error('Positioning in canvas invalid.');
        }
      }
      
      function place() {
        for(z = 0; z < this.square_height; z++) {
          line.draw(this.character,this.square_width,this.y_pos + z,this.x_pos);
        }
      }
      
      init.apply(this);
      place.apply(this)
    }
    
  }
  
  //Public API
  return {
    line,
    square,
    createCanvas,
    drawCanvas
  }
}
