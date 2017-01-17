## Macros in depth

Contents
* [Making a macro](#making)
* [Basic macro types](#types)
* [Adding a macro to a canvas](#adding)
* [The macro type](#macro-type)
* [Updating macro actions](#update)
* [Macro changes](#macro-changes)
* [Naming actions](#naming-actions)
* [Polymorphism and using macro change arrays](#polymorphism)


### <a name="making">Making a macro

<small>Making a macro to place drawing actions that can be reused in many places on a canvas and on many canvas'.</small>

```javascript
var myMacro = TextDraw.macro.init();
```

### <a name="types">Basic macro types

<small>Note: You do not need to enter every attribute, there are defaults in place.</small>

```javascript
myMacro.setActions({
    actions: [
        {type: "line", c: "-", l: 5, x: 1, y: 3, extras: {vertical: false, styling: "color:blue;"}},
    //{Draw a line, character "-", length 5, x 1, y 3, extra_options (vertical and styling)}
        {type: "square", c:" ", w: 54, h: 10, x: 1, y: 1, extras: {styling: "background:#2da0c3;"}},
    //{Draw a square, character " ", width 54, height 10, x 1, y 1, extra_options (styling)}
        {type: "text", text: "Hello World", x: 1, y: 1, extras: {styling: "color:red;"}},
    //{Draw text, text "Hello World", x 1, y 1, extra_options (styling)}
        {type: "point", c: "#", x: 1,y : 1, extras: {styling: "color:red;"}}
    //{Draw a point, character "#", x 1, y 1, extra_options (styling)}
    ]
})
```

### <a name="adding">Adding a macro to a canvas

```javascript
myMacro.make({canvas: myCanvas});
//Add myMacro to myCanvas
```

### <a name="macro-type">The macro type

<small>Put macros inside of other macros</small>

```javascript
myParentMacro = TextDraw.macro.init();
myParentMacro.setActions({
    actions: [
        {type: "macro", name: myMacro, macro_changes: {0: {x: 34}, 1: {x: 35}}}
    //{Draw macro, macro to draw is myMacro, macro_changes (covered later in this doc)}
    ]
})
```

### <a name="update">Updating macro actions

<small>Updating macro actions inside other macros coming soon.</small>
<small>(Macro actions start counting at 0)<br> Update or change macro action attributes before you add it to the canvas.</small>
```javascript
myMacro.make({canvas: myCanvas}, {0: {extras: {styling: "background:red;"}}, 1: {x: 33}});
//add myMacro to myCanvas, edit action 0 (line)'s extras attribute, edit action 1 (square)'s x attribute.
//Note that these changes alter the original macro.
```

### <a name="macro-changes">Macro changes

<small>You can update other macros within another macro.</small>
```javascript
myParentMacro = TextDraw.macro.init();
myParentMacro.setActions({
    actions: [
        {type: "macro", name: myMacro, macro_changes: {0: {x: 34}, 1: {x: 35}}}
    //macro_changes, edit myMacro's action 0 (line)'s x attribute, edit action 1's x attribute.
    ]
})
```

### <a name="naming-actions">Naming actions

<small>You can name actions instead of having to refer to them with numbers.</small>
```javascript
myMacro = TextDraw.macro.init();
myMacro.setActions({
    actions: [
        {type: "line", c: "-", l: 5, x: 1, y: 3, extras: {vertical: false, styling: "color:blue;"}},
        {type: "square", c:" ", w: 54, h: 10, x: 1, y: 1, extras: {styling: "background:#2da0c3;"}},
        {type: "text", text: "Hello World", x: 1, y: 1, extras: {styling: "color:red;"}},
        {type: "point", c: "#", x: 1,y : 1, extras: {styling: "color:red;"}}
    ],
    
    names: {
        "myLine": 0,
        "mySquare": 1, 
        "myText": 2,
        "myPoint": 3
    }
})

myParentMacro = TextDraw.macro.init();
myParentMacro.setActions({
    actions: [
        {type: "macro", name: myMacro, macro_changes: {"mySquare": {x: 34}, "myLine": {x: 35}}}
    ]
})
```

### <a name="polymorphism">Polymorphism and using macro change arrays

<small>I have made a small example of using Polymorphism and macro change arrays, and a small explanation at the bottom as well.</small>
```javascript
//Working example
var H = TextDraw.macro.init();
H.setActions({
  actions: [
    //H
    {type: "square",c:" ", w: 10,h: 10, extras: {styling: "background:orange;"}},
    {type: "square",c:" ", w: 8,h: 4,x:2, extras: {styling: "background:#2da0c3;"}},
    {type: "square",c:" ", w: 8,h: 5,x:2,y:6, extras: {styling: "background:#2da0c3;"}}
  ],
  
  names: {"main": 0}
})

var E = TextDraw.macro.init();
E.setActions({
  actions: [
    //E
    {type: "square",c:" ", w: 10,h: 10,x:12, extras: {styling: "background:orange;"}},
    {type: "square",c:" ", w: 9,h: 4,x:13,y:2, extras: {styling: "background:#2da0c3;"}},
    {type: "square",c:" ", w: 9,h: 3,x:13,y:7, extras: {styling: "background:#2da0c3;"}}
  ]
})

var L = TextDraw.macro.init();
L.setActions({
  actions: [
    //L's
    {type: "square",c:" ", w: 10,h: 10,x:23, extras: {styling: "background:orange;"}},
    {type: "square",c:" ", w: 9,h: 9,x:24,y:1, extras: {styling: "background:#2da0c3;"}}
  ],
  
  names: {"main": 0}
})

var O = TextDraw.macro.init();
O.setActions({
  actions: [
    //O
    {type: "square",c:" ", w: 10,h: 10,x:45, extras: {styling: "background:orange;"}},
    {type: "square",c:" ", w: 8,h: 8,x:46,y:2, extras: {styling: "background:#2da0c3;"}}
  ]
})

var HelloMacro = TextDraw.macro.init();

function setHelloActions(color) {
  function setupStyling(){
    return {0: {extras: {styling: "background:" + color + ";"}}};
  }
  HelloMacro.setActions({
    actions: [
      //Base
      {type: "square",c:" ", w: 54,h: 10, extras: {styling: "background:#2da0c3;"}},
      {type: "macro",name: H,macro_changes: setupStyling() },
      {type: "macro",name: E,macro_changes: setupStyling() },
      {type: "macro",name: L,macro_changes: [setupStyling(), {"main": {x: 23},1: {x:24}}] },
      {type: "macro",name: L,macro_changes: [setupStyling(), {"main": {x: 34},1: {x:35}}] },
      {type: "macro",name: O,macro_changes: setupStyling() }
    ]
  })
}

var TD2 = TextDraw.init();
TD2.createCanvas(55,10);
setHelloActions("red");
HelloMacro.make({canvas: TD2});

var TD3 = TextDraw.init();
TD3.createCanvas(55,10);
setHelloActions("green");
HelloMacro.make({canvas: TD3});
```

<small>By using..</small>

```javascript
macro_changes: [setupStyling(), {"main": {x: 23},1: {x:24}}]
```

<small>You can have both dynamic attribute editing and static attribute setting for things that shouldn't change but are needed.