var fs = require('fs');
var imgGen = require('../index.js');

var dir = './test_data/';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

// Generate one image
imgGen.generateImage(800, 600, undefined, function(err, image) {
    fs.writeFileSync(dir + 'dummy.jpg', image.data);
});

// Generate multiple images
// Will generate same color on the images every time we run since we use the
// fileName as a seed
for(var i=1;i<=10;i++){
  var fileName = 'dummy-' + i + '.jpg';
  var color = imgGen.generateColor(fileName, true);
    imgGen.generateImage(800, 600, color, function(err, image) {
        console.log("Generating image #" +i);
        fs.writeFileSync(dir + fileName, image.data);
    });
}

var fileName = 'dummy-1.jpg';
var jpegData = fs.readFileSync(dir + fileName);
var stripeColor = {
  r: 255,
  g: 255,
  b: 255,
  a: 255
};
imgGen.addStripes(jpegData, stripeColor, function(err, image) {
    console.log("Added stripes to image " +fileName);
    fs.writeFileSync(dir + 'striped_ ' + fileName, image.data);
});
