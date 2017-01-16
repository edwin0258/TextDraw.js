# TextDraw.js

### Importing

Download text-draw.js and place it in a folder where you can access it.
```javascript
var TextDraw = require("[PATH]/text-draw.js");
```
Or, if you would like to use the minified TextDraw.
```javascript
var TextDraw = require("[PATH]/text-draw.min.js");
```

### Initializing

Once you have imported TextDraw you can start to use it!

First create a TextDraw object and initialize it.

```javascript
var myCanvas = TextDraw.init();
```

Create a canvas of size`(x, y)` for your text 

```javascript
myCanvas.createCanvas(21,9);
```

###### *Note: Drawing must be contained within the canvas or you will recieve an error.*

### Drawing

There are many options for drawing, but this demo will stick to creating a basic
square with some text inside it.

Create a `square` on the canvas.

```javascript
myCanvas.square.draw("#",21,9,1,1);
//square.draw(character, width, height, x, y, extras)
```

Then place some `text` inside.

```javascript
myCanvas.text.draw("Hello World",5,5);
//text.draw(text, x, y)
```

### Displaying

You can display the canvas that you have drawn with `logConsole`.

```javascript
myCanvas.logConsole();
//or
myCanvas.logConsole({display_color: false});
//for consoles that do not support color.
```

You can also display the canvas on a web page by using `drawCanvas`.

```javascript
var container = document.getElementById("demo");
demo.innerHTML = myCanvas.drawCanvas();
```

Make sure to wrap any element that you plan to insert a canvas into with `pre` tags.

```html
<pre><div id="demo"></div></pre>
```

### Result

You should see something similar to:
```
##################### 
##################### 
##################### 
##################### 
#####Hello World##### 
##################### 
##################### 
##################### 
#####################
```

### Further reading

Please refer to the docs folder.
