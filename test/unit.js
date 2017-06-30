var assert = require('assert');
var SjotorpImage = require('../index.js');

describe('Sjotorp Image', function() {
  describe('generateColor', function() {
    it('generate same color from same seed', function() {
      var seed = 'dummy_seed';
      SjotorpImage.generateColor(seed);
      assert.deepEqual(SjotorpImage.generateColor(seed), SjotorpImage.generateColor(seed));
    });

    it('should set alpha to full if not specified', function() {
      assert.equal(255, SjotorpImage.generateColor().a);
    });

    it('should set alpha to random if specified', function() {
      assert.equal(137, SjotorpImage.generateColor('seed', true).a);
    });
  });

  describe('generateImage', function() {
    var defaultColor = SjotorpImage.generateColor('seed', true);
    it('should generate small images', function() {
      SjotorpImage.generateImage(1, 1, defaultColor, function(error, jpgData) {
        assert.equal(null, error);
        assert.equal(1, jpgData.width);
        assert.equal(1, jpgData.height);
        assert.equal(612, jpgData.data.length);
      });
    });
    it('should generate big images', function() {
      SjotorpImage.generateImage(1024, 2048, defaultColor, function(error, jpgData) {
        assert.equal(null, error);
        assert.equal(1024, jpgData.width);
        assert.equal(2048, jpgData.height);
        assert.equal(57954, jpgData.data.length);
      });
    });
    it('should generate a color if not defined', function() {
      SjotorpImage.generateImage(1, 1, undefined, function(error, jpgData) {
        assert.equal(null, error);
        assert.equal(1, jpgData.width);
        assert.equal(1, jpgData.height);
        assert.equal(612, jpgData.data.length);
      });
    });
  });
});
