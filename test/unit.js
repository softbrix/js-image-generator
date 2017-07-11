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

  describe('addStripes', function() {
    var defaultColor = SjotorpImage.generateColor('seed', true);
    it('should addStripes to big images', function() {
      SjotorpImage.generateImage(20, 40, defaultColor, function(error, jpgData) {
        assert.equal(null, error);
        assert.equal(20, jpgData.width);
        assert.equal(40, jpgData.height);
        assert.equal(636, jpgData.data.length);
        assert.equal(255, jpgData.data[0]);
        assert.equal(0, jpgData.data[612]);
        var stripeColor = SjotorpImage.generateColor('seed2', true);
        SjotorpImage.addStripes(jpgData.data, stripeColor, function(error, newData) {
          assert.equal(null, error);
          assert.equal(jpgData.width, newData.width);
          assert.equal(jpgData.height, newData.height);
          assert.equal(744, newData.data.length);
          assert.equal(255, newData.data[0]);
          assert.equal(245, newData.data[612]);
        });
      });
    });
  });
});
