let TextDraw = {
  init: function() {
    let canvas = [];
    let width = 0;
    let height = 0;
    let color = "black";
    //Master functions
    function createCanvas(x,y) {
      width = x;
      height = y;
      canvas = [...Array(height)].map(j => [...Array(width)].map(z => " "));
    }
    
    function expandCanvas(x,y) {
      var canvas_len = canvas.length;
      arr = canvas.map(m => {
        return m.concat([...Array(x - m.length)].map(z => " "));
      });
      for(z = 0;z < y - canvas_len; z++){
        arr.push([...Array(x)].map(x => " ")); 
      }
      width = x;
      height = y;
      canvas = arr;
    }
    
    function shrinkCanvas(x,y) {
      arr = canvas.slice(0,x).map(z => z.slice(0,y));
      width = x;
      height = y;
      canvas = arr;
    }
    
    function drawCanvas() {
      return canvas.map(x => x.join('')).join(" \n");
    }
    
    function getContent(x, y) {
      var div = document.createElement('div');
      div.innerHTML = canvas[y - 1][x - 1];
      return div.innerText;
    }
    
    function logCanvas() {
      //remove span tags from all characters.
      let c = canvas.map((row,y) => row.map((char,x) => getContent(x + 1,y + 1)));
      console.log(c.map(x => x.join('')).join(" \n"));
    }
    
    function validPosition(x = 1, y = 1, w = 1, h = 1) {
      w -=1; //Since a width or height of 1 will place exactly on x or y
      h -=1;
      if(x <= width   &&
         y <= height  &&
         x > 0        &&
         y > 0) {
          if(x + w <= width &&
             y + h <= height &&
             w >= 0 &&
             h >= 0){
               return true;
             } else {
               throw Error("Positioning in canvas invalid. Width: " + (w+1) + " Height: " + (h+1) + " goes outside canvas."); 
             }
         } else {
           throw Error("Positioning in canvas invalid. Row: " + y + " Column: " + x + " not found");
         }
    }
    
    function pack(chars,color = "black") {
      //package characters for placing on canvas.
      return "<span style='color:" + color + "'>" + chars + "</span>";
    }
    
    //Drawing types
    let line = {
      character: "@",
      char_count: 4, //length of line
      color: "black", //color of line
      random_char: false, //if there is an array of characters choose at random.
      random_color: false,
      x_pos: 0,
      y_pos: 0,
      draw: function(char = "@", l = 4, y = 1, x = 1, obj = {vertical: false, color: "black"}) {
        //DRAW - character, length, y_position, x_position
        function init() {
          //defaults of specific object keys.
          obj.vertical = obj.vertical || false;
          this.character = char;
          this.char_count = l;
          this.color = obj.color || "black";
          this.x_pos = x - 1; // row 2 will be row 2 instead of row 3.
          this.y_pos = y - 1;
          
          if(obj.vertical) {
            //vertical line validator
            validPosition(x,y,1,l);
          } else {
            //horizontal line validator
            validPosition(x,y,l);
          }
          
          if(Array.isArray(this.character)) {
            this.random_char = true;
          }
          
          if(Array.isArray(this.color)) {
            this.random_color = true;
          }
        }
        
        
        function place() {
          if(obj.vertical === false) {
            var spliced_canvas = canvas[this.y_pos].splice(this.x_pos,this.char_count - 1);
            canvas[this.y_pos][this.x_pos] = [...Array(this.char_count)].map((ch,i) => {
              let c = this.character;
              let p = this.color;
              //if character is an array, choose a char from the array.
              if(this.random_char) {
                c = this.character[Math.floor(Math.random() * this.character.length)];
              }
              
              if(this.random_color) {
                p = this.color[Math.floor(Math.random() * this.color.length)];
              }
              //special blank character, does not replace existing character on canvas.
              if(c == "_BLANK_") {
                return spliced_canvas[i] || canvas[this.y_pos][this.x_pos];
              }
              //return pack(character, color)
              return pack(c, p);
            });
            canvas[this.y_pos] = [].concat.apply([],canvas[this.y_pos]);
          } else {
            for(z = 0; z < this.char_count; z++) {
              let c = this.character;
              let p = this.color;
              if(this.random) {
                c = this.character[Math.floor(Math.random() * this.character.length)];
              }
              
              if(this.random_color) {
                p = this.color[Math.floor(Math.random() * this.color.length)];
              }
              canvas[this.y_pos + z][this.x_pos] = pack(c,p);
            }
          }
        }
        
        init.apply(this);
        place.apply(this);
      }
    };
    
    let square = {
      character: "@",
      square_width: 4,
      square_height: 4,
      color: "black",
      x_pos: 0,
      y_pos: 0,
      draw: function(char = "@", w = 4, h = 4, y = 1, x = 1, obj = {color: "black"}) {
        //DRAW - character, width, height, y_position, x_position
        function init() {
          this.character = char;
          this.color = obj.color || "black";
          this.square_width = w;
          this.square_height = h;
          validPosition(x,y,w,h);
          this.x_pos = x;
          this.y_pos = y;
        }
        
        function place() {
          for(z = 0; z < this.square_height; z++) {
            line.draw(this.character,this.square_width,this.y_pos + z,this.x_pos,{color: this.color});
          }
        }
        
        init.apply(this);
        place.apply(this);
      }
    };
    
    let text = {
      characters: "",
      color: "black",
      x_pos: 0,
      y_pos: 0,
      draw: function(chars = "", x = 1, y = 1, obj = {color: "black"}) {
        //DRAW characters in text, x_position, y position
        function init() {
          this.characters = chars;
          this.color = obj.color || "black";
          this.x_pos = x - 1;
          this.y_pos = y - 1;
        }
        
        function place() {
          canvas[this.y_pos].splice(this.x_pos,this.characters.length - 1);
          canvas[this.y_pos][this.x_pos] = this.characters.split('').map(x => {
            return pack(x, this.color);
          });
          canvas[this.y_pos] = [].concat.apply([],canvas[this.y_pos]);
        }
        
        init.apply(this);
        place.apply(this);
      }
    };
    
    let point = {
      character: "@",
      color: "black",
      x_pos: 0,
      y_pos: 0,
      draw: function(char = "@", x = 1, y = 1, obj = {color: "black"}) {
        //DRAW character, x_position, y_position
        function init() {
          this.character = char;
          this.color = obj.color || "black";
          this.x_pos = x - 1;
          this.y_pos = y - 1;
        }
        
        function place() {
          canvas[this.y_pos][this.x_pos] = pack(this.character, this.color);
        }
        
        init.apply(this);
        place.apply(this);
      }
    };
    
    //Public API
    return {
      line,
      square,
      text,
      point,
      createCanvas,
      expandCanvas,
      shrinkCanvas,
      drawCanvas,
      getContent,
      logCanvas
    };
  }
};
