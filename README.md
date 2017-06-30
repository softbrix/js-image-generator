# sjotorp_image

This is a node module for generating random images.

 - Works platform independent
 - Needs no building thanks to jpeg-js
 - Generates random colored images

I needed this for creating dummy datasets including images in combination with faker.js and / or choice.js

Uses the jpeg-js library: https://github.com/eugeneware/jpeg-js

## Installation
```bash
npm install sjotorp_image
```

## Example Usage

```js
var fs = require('fs');
var imgGen = require('sjotorp_image');

// Generate one image
imgGen.generateImage(800, 600, undefined, function(err, image) {
    fs.writeFileSync('dummy.jpg', image.data);
});

// Generate multiple images
// Will generate same color on the images every time we run since we use the
// fileName as a seed
for(var i=1;i<=10;i++){
  var fileName = 'dummy-' + i + '.jpg';
  var color = imgGen.generateColor(fileName);
    imgGen.generateImage(800, 600, color, function(err, image) {
        console.log("Generating image #" +i);
        fs.writeFileSync(fileName, image.data);
    });
}
```
