## The Odin Project: etch-a-sketch
This is a [Javascript project](https://www.theodinproject.com/lessons/foundations-etch-a-sketch) from the **Foundations** section.

### Assignment

- Create a webpage with a 16x16 grid of square divs. Create the divs using JavaScript. Don’t try making them by hand 
with copy and pasting in your HTML file!
- Set up a “hover” effect so that the grid divs change color when your mouse passes over them, leaving a (pixelated) 
trail through your grid like a pen would.
- Add a button to the top of the screen which will clear the current grid and send the user a popup asking for the 
number of squares per side for the new grid. Once entered, the new grid should be generated in the same total space as 
before (e.g. 960px wide) so that you’ve got a new sketch pad.
- (Optional): Instead of just changing the color of a square from black to white (for example), have each pass through 
with the mouse change it to a completely random RGB value. Then try having each pass just add another 10% of black to 
it so that only after 10 passes is the square completely black.

### Changes and final result
Resizing grid
- replaced prompt with a grid size slider

Cell coloring
- cells are colored on mousedown & mouseover

Coloring modes
- added 'lighten' button
- added 'eraser' button
- added color picker

Other
- added a button for toggling the border on/off

Live preview: https://humanathome.github.io/etch-a-sketch/

![Sample img](https://www.dropbox.com/s/lp7ho8e8869qt6z/2022-05-05_16-41.png?raw=true)
