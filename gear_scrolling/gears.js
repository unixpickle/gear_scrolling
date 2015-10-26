(function() {

  function Gear(left, topPercent) {
    this._left = left;

    this._element = document.createElement('div');
    if (left) {
      this._element.className = 'gear gear-left';
    } else {
      this._element.className = 'gear gear-right'
    }

    document.body.appendChild(this._element);
    this._halfHeight = this._element.offsetHeight / 2;
    this._element.style.top = 'calc(' + topPercent + '% - ' + this._halfHeight.toFixed(1) + 'px)';

    this.updateAngle();
    window.addEventListener('scroll', function() {
      if (window.scrollX !== 0) {
        this._translate = 'translateX(' + -window.scrollX.toFixed(2) + 'px) ';
      } else {
        this._translate = '';
      }
      this.updateAngle();
    }.bind(this));
    window.addEventListener('resize', this.updateAngle.bind(this));

    this._translate = '';
  }

  Gear.prototype.updateAngle = function() {
    var rect = this._element.getBoundingClientRect();
    var middleOffset = rect.top + rect.width/2;
    var topOffset = middleOffset - 5;

    var contentOffset = window.scrollY;
    var distance = topOffset + contentOffset;
    var cycle = (distance % 30) / 30;
    var rotations = cycle / 6;
    if (!this._left) {
      rotations += 0.5;
    } else {
      rotations *= -1;
    }
    this.setRotation(rotations);
  };

  Gear.prototype.setRotation = function(rotations) {
    var degrees = rotations * 360;
    var transform = this._translate + 'rotate(' + degrees.toFixed(3) + 'deg)';
    this._element.style.transform = transform;
    this._element.style.webkitTransform = transform;
    this._element.style.MozTransform = transform;
    this._element.style.msTransform = transform;
  };

  window.addEventListener('load', function() {
    for (var percent = 10; percent < 100; percent += 20) {
      new Gear(false, percent);
      new Gear(true, percent);
    }
  });

})();
