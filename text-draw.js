 "use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var TextDraw = {
  init: function init() {
    var canvas = [];
    var width = 0;
    var height = 0;
    //Master functions
    function createCanvas(x, y) {
      width = x;
      height = y;
      canvas = [].concat(_toConsumableArray(Array(height))).map(function (j) {
        return [].concat(_toConsumableArray(Array(width))).map(function (z) {
          return pack(" ", "color:black;");
        });
      });
    }

    function expandCanvas(x, y) {
      var canvas_len = canvas.length;
      var arr = canvas.map(function (m) {
        return m.concat([].concat(_toConsumableArray(Array(x - m.length))).map(function (z) {
          return pack(" ", "color:black;");
        }));
      });
      for (var z = 0; z < y - canvas_len; z++) {
        arr.push([].concat(_toConsumableArray(Array(x))).map(function (x) {
          return pack(" ", "color:black;");
        }));
      }
      width = x;
      height = y;
      canvas = arr;
    }

    function shrinkCanvas(x, y) {
      var arr = canvas.slice(0, x).map(function (z) {
        return z.slice(0, y);
      });
      width = x;
      height = y;
      canvas = arr;
    }

    function drawCanvas() {
      return canvas.map(function (x) {
        return x.join('');
      }).join(" \n");
    }

    function getContent(x, y) {
      var div = canvas[y - 1][x - 1];
      return { text: /(style=')(.*)('>)(.*)(<\/span>)/g.exec(div)[4], styling: /(style=')(.*)(')/g.exec(div)[2] };
    }

    function logCanvas() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { display_color: true };

      //remove span tags from all characters.
      var c = canvas.map(function (row, y) {
        return row.map(function (char, x) {
          return getContent(x + 1, y + 1);
        });
      });
      if (obj.display_color === true) {
        var _console;

        var style_arr = [].concat.apply([], c.map(function (x) {
          return x.map(function (x) {
            return x.styling;
          });
        }));
        (_console = console).log.apply(_console, [c.map(function (x) {
          return x.map(function (x) {
            return "%c" + x.text;
          }).join('');
        }).join(' \n')].concat(_toConsumableArray(style_arr)));
      } else {
        console.log(c.map(function (x) {
          return x.map(function (x) {
            return x.text;
          }).join('');
        }).join(' \n'));
      }
    }

    function validPosition() {
      var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var w = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      var h = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

      w -= 1; //Since a width or height of 1 will place exactly on x or y
      h -= 1;
      if (x <= width && y <= height && x > 0 && y > 0) {
        if (x + w <= width && y + h <= height && w >= 0 && h >= 0) {
          return true;
        } else {
          throw Error("Positioning in canvas invalid. Width: " + (w + 1) + " Height: " + (h + 1) + " goes outside canvas.");
        }
      } else {
        throw Error("Positioning in canvas invalid. Row: " + y + " Column: " + x + " not found");
      }
    }

    function pack(chars) {
      var styling = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "color:black;";

      //package characters for placing on canvas.
      return "<span style='" + styling + "'>" + chars + "</span>";
    }

    //Drawing types
    var line = {
      character: "@",
      char_count: 4, //length of line
      styling: "color:black;", //styling of line
      random_char: false, //if there is an array of characters choose at random.
      random_color: false,
      x_pos: 0,
      y_pos: 0,
      draw: function draw() {
        var char = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "@";
        var l = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;
        var x = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
        var y = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
        var obj = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : { vertical: false, styling: "color:black;" };

        //DRAW - character, length, y_position, x_position
        function init() {
          //defaults of specific object keys.
          obj.vertical = obj.vertical || false;
          this.styling = obj.styling || "color:black;";
          this.character = char;
          this.char_count = l;
          this.x_pos = x - 1; // row 2 will be row 2 instead of row 3.
          this.y_pos = y - 1;

          if (obj.vertical) {
            //vertical line validator
            validPosition(x, y, 1, l);
          } else {
            //horizontal line validator
            validPosition(x, y, l);
          }

          this.random_char = false; //reset random before each line is made
          this.random_color = false;
          if (Array.isArray(this.character)) {
            this.random_char = true;
          }

          if (Array.isArray(this.styling)) {
            this.random_color = true;
          }
        }

        function place() {
          var _this = this;

          if (obj.vertical === false) {
            var spliced_canvas = canvas[this.y_pos].splice(this.x_pos, this.char_count - 1);
            canvas[this.y_pos][this.x_pos] = [].concat(_toConsumableArray(Array(this.char_count))).map(function (ch, i) {
              var c = _this.character;
              var p = _this.styling;
              //if character is an array, choose a char from the array.
              if (_this.random_char) {
                c = _this.character[Math.floor(Math.random() * _this.character.length)];
              }

              if (_this.random_color) {
                p = _this.styling[Math.floor(Math.random() * _this.styling.length)];
              }
              //special blank character, does not replace existing character on canvas.
              if (c == "_BLANK_") {
                return spliced_canvas[i] || canvas[_this.y_pos][_this.x_pos];
              }
              //return pack(character, styling)
              return pack(c, p);
            });
            canvas[this.y_pos] = [].concat.apply([], canvas[this.y_pos]);
          } else {
            for (var z = 0; z < this.char_count; z++) {
              var c = this.character;
              var p = this.styling;
              if (this.random) {
                c = this.character[Math.floor(Math.random() * this.character.length)];
              }

              if (this.random_color) {
                p = this.styling[Math.floor(Math.random() * this.styling.length)];
              }
              canvas[this.y_pos + z][this.x_pos] = pack(c, p);
            }
          }
        }

        init.apply(this);
        place.apply(this);
      }
    };

    var square = {
      character: "@",
      square_width: 4,
      square_height: 4,
      styling: "color:black;",
      x_pos: 0,
      y_pos: 0,
      draw: function draw() {
        var char = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "@";
        var w = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;
        var h = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 4;
        var x = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
        var y = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
        var obj = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : { styling: "color:black;" };

        //DRAW - character, width, height, y_position, x_position
        function init() {
          this.character = char;
          this.styling = obj.styling || "color:black;";
          this.square_width = w;
          this.square_height = h;
          validPosition(x, y, w, h);
          this.x_pos = x;
          this.y_pos = y;
        }

        function place() {
          for (var z = 0; z < this.square_height; z++) {
            line.draw(this.character, this.square_width, this.x_pos, this.y_pos + z, { styling: this.styling });
          }
        }

        init.apply(this);
        place.apply(this);
      }
    };

    var text = {
      characters: "",
      styling: "color:black;",
      x_pos: 0,
      y_pos: 0,
      draw: function draw() {
        var chars = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
        var x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
        var y = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
        var obj = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : { styling: "color:black;" };

        //DRAW characters in text, x_position, y position
        function init() {
          this.characters = chars;
          this.styling = obj.styling || "color:black;";
          this.x_pos = x - 1;
          this.y_pos = y - 1;
        }

        function place() {
          var _this2 = this;

          canvas[this.y_pos].splice(this.x_pos, this.characters.length - 1);
          canvas[this.y_pos][this.x_pos] = this.characters.split('').map(function (x) {
            return pack(x, _this2.styling);
          });
          canvas[this.y_pos] = [].concat.apply([], canvas[this.y_pos]);
        }

        init.apply(this);
        place.apply(this);
      }
    };

    var point = {
      character: "@",
      styling: "color:black;",
      x_pos: 0,
      y_pos: 0,
      draw: function draw() {
        var char = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "@";
        var x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
        var y = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
        var obj = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : { styling: "color:black;" };

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
      line: line,
      square: square,
      text: text,
      point: point,
      createCanvas: createCanvas,
      expandCanvas: expandCanvas,
      shrinkCanvas: shrinkCanvas,
      drawCanvas: drawCanvas,
      getContent: getContent,
      logCanvas: logCanvas
    };
  },

  macro: {
    init: function init() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { functions: [] };

      var functions = obj.functions || [];
      var canvas = "";
      function make() {
        var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { canvas: "" };

        canvas = o.canvas || "";
        functions.map(function (cmd) {
          if (cmd.type == "line") {
            canvas.line.draw(cmd.c, cmd.l, cmd.y, cmd.x, cmd.extras);
          } else if (cmd.type == "square") {
            canvas.square.draw(cmd.c, cmd.w, cmd.h, cmd.y, cmd.x, cmd.extras);
          } else if (cmd.type == "text" || cmd.type == "point") {
            canvas.text.draw(cmd.text || cmd.c, cmd.x, cmd.y, cmd.extras);
          }
        });
      }

      function getinfo() {
        console.log("functions: " + functions, "canvas: " + JSON.stringify(canvas));
      }

      return {
        make: make,
        getinfo: getinfo
      };
    }
  }
};

module.exports = TextDraw;