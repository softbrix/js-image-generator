var Buffer = require('buffer').Buffer;
var jpeg = require('jpeg-js');
var seedRandom = require('seed-random');

const CHANNEL_MAX = 255;

/**
* Generate a color based on a random seed.
* Alpha will be default to 255 if not specified to be generated as well.
* @param seed a seed from which the random will start
* @param addAlpha (default false) generate the alpha channel in the color object
*/
function generateColor(seed, addAlpha) {
  var random = seedRandom(seed);

  var newValue = () => { return Math.floor(random() * CHANNEL_MAX); };

  var color = {
    r: newValue(),
    g: newValue(),
    b: newValue(),
    a: CHANNEL_MAX
  }
  if(addAlpha) {
    color.a = newValue();
  }
  return color;
}
exports.generateColor = generateColor;

/**
 * Generates an colored image with specified width, height. If a seed is provided then this seed will
 * @param width width of the image
 * @param height height of the image
 * @param seed seed for the random color of the image
 * @param callback callback
 */
exports.generateImage = function(width, height, color, callback) {
    if(width <= 0) {
      callback('Width must be larger than zero');
    }
    if(height <= 0) {
      callback('Height must be larger than zero');
    }
    if(color === undefined) {
      color = generateColor();
    }

    var frameData = new Buffer(width * height * 4);

    var i = 0;
    while (i < frameData.length) {
        // RGBA
        frameData[i++] = color.r;
        frameData[i++] = color.g;
        frameData[i++] = color.b;
        frameData[i++] = color.a;
    }
    var rawImageData = {
        data: frameData,
        width: width,
        height: height
    };
    var quality = 1;
    var jpegImageData = jpeg.encode(rawImageData, quality);

    if(jpegImageData){
        callback(null,jpegImageData);
    }
};

exports.addStripes = function(jpegImageData, color, callback) {
  if(color === undefined) {
    color = generateColor();
  }
  var rawImageData = jpeg.decode(jpegImageData);
  var i = 0;
  for (var row = 0; row < rawImageData.height; row += 2) {
    for(var col = 0; col < rawImageData.width; col += 1) {
      var i = (row * rawImageData.width + col) * 4;  // pixel
      // RGBA
      rawImageData.data[i++] = color.r;
      rawImageData.data[i++] = color.g;
      rawImageData.data[i++] = color.b;
      rawImageData.data[i++] = color.a;
    }
  }
  var quality = 1;
  var jpegImageData = jpeg.encode(rawImageData, quality);

  if(jpegImageData){
      callback(null,jpegImageData);
  }
}
