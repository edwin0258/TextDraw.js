var TextDraw = require("./text-draw.js");

var c = TextDraw.init();
c.createCanvas(10,10);
var myMacro = TextDraw.macro.init({
  functions: [
    {type:"line",c:"#",l:1,y:1,x:1,extras: {styling:"color:blue;"}},
    {type:"square",c:"#",w:4,h:4,y:3,x:3},
    {type:"text",text:"Hello",x:3,y:3},
    {type:"point",c:"W",x:5,y:6,extras: {styling:"color:red;background:green;"}}
  ]
})
myMacro.make({canvas: c})
/*c.square.draw(" ",10,10,1,1,{styling: "background-color:red;"})
c.point.draw("x",1,1,{styling: "background-color:blue;color:red;"})
c.line.draw("$",4,1,4,{vertical:true,styling: ["color:blue;","color:red;text-shadow:1px 1px yellow;"]})*/
/*c.square.draw("o",1,1);
c.square.draw("#",20,20,1,1,{color:["green","#1a1"]})

c.square.draw(["_BLANK_","_BLANK_","_BLANK_","_BLANK_","o"],4,4,1,1,{color:"#4c1f00"})*/
//c.shrinkCanvas(4,4);

c.logCanvas({display_color: false})