/**
 *
 * VIEW CLASS
 *
 * @author: Neels Moller
 * @date: 04 February 2020
 *
 */

class View extends Sprite {


  updateElementStyle() {

    let styleStr = '';

    if (this.x > 0) {

      styleStr += 'left:' + this.x + 'px;';

    }

    if (this.y > 0) {

      styleStr += 'top:' + this.y + 'px;';

    }

    if (this.width > 0) {

      styleStr += 'width:' + this.width + (this.widthInPercent ? '%;' : 'px;');

    }

    if (this.height > 0) {

      styleStr += 'height:' + this.height + (this.heightInPercent ? '%;' : 'px;');

    }

    if (this.animator) {

      styleStr += 'background-position:-' + this.bgLeft + 'px ' + this.bgTop + 'px;';

    }

    if (styleStr.length) { this.elm.style = styleStr; }

  }


  getWidth() {

    return this.elm.clientWidth;

  }


  getHeight() {

    return this.elm.clientHeight;

  }


  getX() {

    return this.elm.offsetLeft;

  }


  getY() {

    return this.elm.offsetTop;

  }


}  // End: View Class
