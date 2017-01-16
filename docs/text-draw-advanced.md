# TextDraw Advanced Topics

Contents
1. [Random characters](#random_char)
2. [Random styles](#random_styles)
3. [Get content](#content)
3. [Macros](#macro)

### <a name="random_char">Random characters

<small>For squares and lines you can set multiple characters, having TextDraw pick a between the characters for each character that it displays.</small>


```javascript
myCanvas.draw.square(["#","$","^"],4,4,5,5);
myCanvas.draw.line(["$","H","P","T"],10,2,2,{vertical: true, styling: "color:blue;"});
```

### <a name="random_styles">Random styles

<small>For squares and lines you can set multiple styles, having TextDraw pick a between the styling for each character that it displays.</small>


```javascript
myCanvas.line.draw("$",4,1,4,{vertical:true,styling: ["color:blue;","color:red;text-shadow:1px 1px yellow;"]})
```

### <a name="content">Get content

<small>Get the content and styling of a position on the canvas.</small>


```javascript
myCanvas.getContent(4,4);
//will return the character at x: 4, y: 4 as well as its styling.
```

### <a name="macro">Macros

##### Making a Macro

<small>This macro is drawing a line, square, text, and a point. It is reusable so you can keep things `DRY`.</small>

```javascript
var myMacro = TextDraw.macro.init({
  functions: [
    {type:"line",c:"#",l:1,y:1,x:1,extras: {styling: ["color:blue;","color:red;text-shadow:1px 1px yellow;"]}},
    {type:"square",c:"#",w:4,h:4,y:3,x:3},
    {type:"text",text:"Hello",x:3,y:3},
    {type:"point",c:"W",x:5,y:6,extras: {styling:"color:red;background:green;"}}
  ]
})
```

##### Using a Macro

<small>You can use the same macro on multiple canvas'.</small>

```javascript
myMacro.make({canvas: myCanvas});
myMacro.make({canvas: myOtherCanvas});
```

##### Get Macro information

<small>Get functions and canvas information of macro.</small>


```javascript
myMacro.getInfo();
//will console log macros information.
```

##### Work in progress..

<small>Setting macro functions after initialization is coming soon.</small>