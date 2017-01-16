![travis ci build](https://travis-ci.org/edwin0258/TextDraw.js.svg?branch=master)

# TextDraw.js

### Importing/Installing

If you are using npm.

```bash
npm install text-draw
```
You can then require text-draw in the file of your choice.
```javascript
var TextDraw = require('text-draw');
```
You can also download text-draw.js (found in build folder on github page) and place it where you can access it.
```javascript
var TextDraw = require('[PATH]/text-draw.js');
```
Or, if you would like to use the minified TextDraw.
```javascript
var TextDraw = require('[PATH]/text-draw.min.js');
```

###### *Note: something like browserify is required to use text-draw on web pages.*

### Initializing

Once you have imported TextDraw..

First, create a TextDraw object and initialize it.

```javascript
var myCanvas = TextDraw.init();
```

Create a canvas of size`(x, y)` for your text.

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
