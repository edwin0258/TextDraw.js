let TextDraw = {
  init: function() {
    let canvas = [];
    let width = 0;
    let height = 0;
    //Master functions
    function createCanvas(x,y) {
      width = x;
      height = y;
      canvas = [...Array(height)].map(j => [...Array(width)].map(z => pack(" ","color:black;")));
    }
    
    function expandCanvas(x,y) {
      var canvas_len = canvas.length;
      var arr = canvas.map(m => {
        return m.concat([...Array(x - m.length)].map(z => pack(" ","color:black;")));
      });
      for(var z = 0;z < y - canvas_len; z++){
        arr.push([...Array(x)].map(x => pack(" ","color:black;"))); 
      }
      width = x;
      height = y;
      canvas = arr;
    }
    
    function shrinkCanvas(x,y) {
      var arr = canvas.slice(0,x).map(z => z.slice(0,y));
      width = x;
      height = y;
      canvas = arr;
    }
    
    function clearCanvas() {
      canvas = canvas.map(x => x.map(x => pack(" ","color:black;")));
    }
    
    function fillCanvas(char = "@",obj = {styling: "color:black;"}) {
      square.draw(char,width,height,1,1,{styling: obj.styling});
    }
    
    function drawCanvas() {
      return canvas.map(x => x.join('')).join(" \n");
    }
    
    function getContent(x, y) {
      var div = canvas[y - 1][x - 1];
      return { text: /(style=')(.*)('>)(.*)(<\/span>)/g.exec(div)[4], styling: /(style=')(.*)(')/g.exec(div)[2]};
    }
    
    function logCanvas(obj = {display_color: true}) {
      //remove span tags from all characters.
      let c = canvas.map((row,y) => row.map((char,x) => getContent(x + 1,y + 1)));
      //percentage characters cause a bug in styling.
      if(c.map(x => x.map(x => x.text).join('')).join('').match("%")){
        console.warn("If you are using percentage symbols in your canvas you may want to switch display_color to false.");
      }
      if(obj.display_color === true) {
        let style_arr = [].concat.apply([],c.map(x => x.map(x => x.styling)));
        console.log(c.map(x => x.map(x => "%c" + x.text).join('')).join(' \n'), ...style_arr);
      } else {
        console.log(c.map(x => x.map(x => x.text).join('')).join(' \n'));
      }
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
    
    function pack(chars,styling = "color:black;") {
      //package characters for placing on canvas.
      return "<span style='" + styling + "'>" + chars + "</span>";
    }
    
    //Drawing types
    let line = {
      character: "@",
      char_count: 4, //length of line
      styling: "color:black;", //styling of line
      random_char: false, //if there is an array of characters choose at random.
      random_color: false,
      x_pos: 0,
      y_pos: 0,
      draw: function(char = "@", l = 4, x = 1, y = 1, obj = {vertical: false, styling: "color:black;"}) {
        //DRAW - character, length, y_position, x_position
        function init() {
          //defaults of specific object keys.
          obj.vertical = obj.vertical || false;
          this.styling = obj.styling || "color:black;";
          this.character = char;
          this.char_count = l;
          this.x_pos = x - 1; // row 2 will be row 2 instead of row 3.
          this.y_pos = y - 1;
          
          if(obj.vertical) {
            //vertical line validator
            validPosition(x,y,1,l);
          } else {
            //horizontal line validator
            validPosition(x,y,l);
          }
          
          this.random_char = false; //reset random before each line is made
          this.random_color = false;
          if(Array.isArray(this.character)) {
            this.random_char = true;
          }
          
          if(Array.isArray(this.styling)) {
            this.random_color = true;
          }
        }
        
        
        function place() {
          if(obj.vertical === false) {
            var spliced_canvas = canvas[this.y_pos].splice(this.x_pos,this.char_count - 1);
            canvas[this.y_pos][this.x_pos] = [...Array(this.char_count)].map((ch,i) => {
              let c = this.character;
              let p = this.styling;
              //if character is an array, choose a char from the array.
              if(this.random_char) {
                c = this.character[Math.floor(Math.random() * this.character.length)];
              }
              
              if(this.random_color) {
                p = this.styling[Math.floor(Math.random() * this.styling.length)];
              }
              //special blank character, does not replace existing character on canvas.
              if(c == "_BLANK_") {
                return spliced_canvas[i] || canvas[this.y_pos][this.x_pos];
              }
              //return pack(character, styling)
              return pack(c, p);
            });
            canvas[this.y_pos] = [].concat.apply([],canvas[this.y_pos]);
          } else {
            for(var z = 0; z < this.char_count; z++) {
              let c = this.character;
              let p = this.styling;
              if(this.random) {
                c = this.character[Math.floor(Math.random() * this.character.length)];
              }
              
              if(this.random_color) {
                p = this.styling[Math.floor(Math.random() * this.styling.length)];
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
      styling: "color:black;",
      x_pos: 0,
      y_pos: 0,
      draw: function(char = "@", w = 4, h = 4, x = 1, y = 1, obj = {styling: "color:black;"}) {
        //DRAW - character, width, height, y_position, x_position
        function init() {
          this.character = char;
          this.styling = obj.styling || "color:black;";
          this.square_width = w;
          this.square_height = h;
          validPosition(x,y,w,h);
          this.x_pos = x;
          this.y_pos = y;
        }
        
        function place() {
          for(var z = 0; z < this.square_height; z++) {
            line.draw(this.character,this.square_width,this.x_pos,this.y_pos + z,{styling: this.styling});
          }
        }
        
        init.apply(this);
        place.apply(this);
      }
    };
    
    let text = {
      characters: "",
      styling: "color:black;",
      x_pos: 0,
      y_pos: 0,
      draw: function(chars = "", x = 1, y = 1, obj = {styling: "color:black;"}) {
        //DRAW characters in text, x_position, y position
        function init() {
          this.characters = chars;
          this.styling = obj.styling || "color:black;";
          this.x_pos = x - 1;
          this.y_pos = y - 1;
        }
        
        function place() {
          canvas[this.y_pos].splice(this.x_pos,this.characters.length - 1);
          canvas[this.y_pos][this.x_pos] = this.characters.split('').map(x => {
            return pack(x, this.styling);
          });
          canvas[this.y_pos] = [].concat.apply([],canvas[this.y_pos]);
        }
        
        init.apply(this);
        place.apply(this);
      }
    };
    
    let point = {
      character: "@",
      styling: "color:black;",
      x_pos: 0,
      y_pos: 0,
      draw: function(char = "@", x = 1, y = 1, obj = {styling: "color:black;"}) {
        //DRAW character, x_position, y_position
        function init() {
          this.character = char;
          this.styling = obj.styling || "color:black;";
          this.x_pos = x - 1;
          this.y_pos = y - 1;
        }
        
        function place() {
          canvas[this.y_pos][this.x_pos] = pack(this.character, this.styling);
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
      clearCanvas,
      fillCanvas,
      drawCanvas,
      getContent,
      logCanvas
    };
  },
  
  macro: {
    init: function(obj = {actions: [], names: []}) {
      let actions = obj.actions || [];
      let names = obj.names || [];
      let canvas = "";
      function makeChanges(changes) {
        for(action in changes) {
          let change = changes[action];
          if(names[action] != undefined) {
            action = names[action];
          }
          for(attribute in change) {
            let value = change[attribute];
            setAttribute(action,attribute,value);
          }
        }
      }
      function make(o = {canvas: ""},changes) {
        canvas = o.canvas || "";
        console.log(changes)
        if(changes){
          //Make changes before drawing macro.
          if(Array.isArray(changes)){
            changes.map(changes => {
              makeChanges(changes)
            })
          } else {
            makeChanges(changes)
          }
        }
        actions.map(cmd => {
          if(cmd.type == "line") {
            canvas.line.draw(cmd.c, cmd.l, cmd.x, cmd.y, cmd.extras);
          } else if (cmd.type == "square") {
            canvas.square.draw(cmd.c, cmd.w, cmd.h, cmd.x, cmd.y, cmd.extras);
          } else if (cmd.type == "text" || cmd.type == "point") {
            canvas.text.draw(cmd.text || cmd.c, cmd.x, cmd.y, cmd.extras);
          } else if (cmd.type == "macro") {
            cmd.name.make({canvas},cmd.macro_changes);
          } else if (cmd.type == "set_macro") {
            cmd.name.setAttributes(cmd.action, cmd.changes)
          } else {
            throw Error("Invalid macro type: " + cmd.type);
          }
        })
      }
      
      function setActions(obj = {actions, names}) {
        actions = obj.actions || [];
        names = obj.names || [];
      }
      
      function setAttribute(action = 0, attribute = "", change = "") {
          actions[action][attribute] = change;
      }
      
      function getInfo() {
        console.log("actions: " + JSON.stringify(actions), "canvas: " + JSON.stringify(canvas));
      }
      
      return {
        make,
        setActions,
        setAttribute,
        getInfo
      };
    }
  }
};
