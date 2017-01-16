# TextDraw Basics

Contents
1. [Setting up a canvas](#setup)
2. [Drawing a line](#line)
  1.  [Drawing a vertical line](#vertical)
3. [Drawing text](#text)
4. [Drawing a point](#point)
5. [Add css styling](#styling)
6. [Logging the canvas](#logging)
7. [Drawing the canvas](#drawing)
8. [Expanding the canvas](#expand)
9. [Shrinking the canvas](#shrink)

### <a name="setup">Setting up a canvas


```javascript
var myCanvas = TextDraw.init();
myCanvas.createCanvas(10,10);
```

### <a name="line">Drawing a line

<small>Draw a line on the canvas.</small>

```javascript
myCanvas.line.draw("#",4,5,5);
//draw.line(character, length, x, y, obj)
```

### <a name="vertical">Drawing a vertical line

```javascript
myCanvas.line.draw("#",4,5,5,{vertical: true});
```

### <a name="square">Drawing a square

<small>Draw a square on the canvas.</small>

```javascript
myCanvas.square.draw("#",4,4,5,5);
//square.draw(character, width, height, x, y, obj)
```

### <a name="text">Drawing text

<small>Draw some text on the canvas.</small>

```javascript
myCanvas.text.draw("Hello World",5,5);
//text.draw(text, x, y, obj)
```

### <a name="point">Drawing a point

<small>Draw a single character on the canvas.</small>

```javascript
myCanvas.point.draw("&",5,5);
//point.draw(character, x, y, obj)
```

### <a name="styling">Add css styling

<small>Add css styling to the canvas by drawing items with an object containing a styling key and value of css properties.</small>

<small>Works with line, square, point, and text.</small>

```javascript
myCanvas.line.draw("#",4,5,5,{styling: "background:red; color: green;"});
myCanvas.square.draw("#",4,4,5,5,{styling: "text-shadow:2px 2px yellow;"});
```

### <a name="logging">Logging the canvas

```javascript
myCanvas.logCanvas();
//And for consoles that do not support color..
myCanvas.logCanvas({display_color: false});
```

### <a name="drawing">Drawing the canvas

```javascript
document.write(myCanvas.drawCanvas());
//or
var myContainer = document.querySelector(".demo");
myContainer.innerHTML = myCanvas.drawCanvas();
```

### <a name="expand">Expanding the canvas

<small>If you want to expand the canvas after you have created it.</small>

```javascript
myCanvas.expandCanvas(21,20);
//canvas is now of width 21 and height 20.
```

### <a name="expand">Shrinking the canvas

<small>If you want to shrink the canvas after you have created it.</small>

```javascript
myCanvas.shrinkCanvas(11,10);
//canvas is now of width 11 and height 10.
```
