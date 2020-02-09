/**
 *
 * SPRITE CLASS
 *
 * @author: Neels Moller
 * @date: 05 February 2020
 *
 */

class Sprite extends Entity {


  constructor(id, parent, props) {

    super(id, parent);

    this.x = 0;
    this.y = 0;
    this.bgTop = 0;
    this.bgLeft = 0;
    this.width = 0;
    this.height = 0;
    this.speed = 0;
    this.horzSpeed = 0;        // pixels per second
    this.vertSpeed = 0;        // pixels per second
    this.lastMoveTime = 0;     // unix time
    this.lastUpdateTime = 0;   // unix time
    this.classUpdated = false;
    this.styleDataUpdated = false;
    this.styleData = {};
    this.className = '';
    this.mounted = false;
    this.tagName = 'div';
    this.elm = null;

    if (props) { this.init(props); }

  }


  build() {

    this.elm = document.createElement(this.tagName || 'div');

    this.elm.id = this.id;

    this.log(this.type + '.build():', this.id, '- Done,', this.elm);

    return this;

  }


  mountChild(child, props = {}) {

    if ( ! child || typeof child === 'string' ) {

      props.id = child ? child : this.id + '_' + this.engine.nextId++;
      child = document.createElement(props.tagName || 'div');  

    }

    if (child.mount) { // child == Sprite

      child.init(props);
      child.mount(this.elm);

    }
    else { // child == DOM Element

      for (let prop in props) { child[prop] = props[prop]; }
      this.elm.appendChild(child);

    }

    this.addChild(child);

    return child;

  }


  mount(parentElm, props) {

    if (props) { this.init(props); }

    if ( ! parentElm ) {

      this.elm = document.getElementById(this.id);

      if (this.elm) {

        this.mounted = true;
        this.log(this.type + '.mount():', this.id, '- Element already mounted!', this.elm);

      }
      else {

        parentElm = this.engine.view.elm;

      }

    }

    if ( ! this.elm ) {

      this.build();

    }

    this.updateElementContent();
    this.updateElementClass();
    this.updateElementStyle();

    if ( ! this.mounted ) {

       parentElm.appendChild(this.elm);
       this.mounted = true;
    }

    this.children.forEach(child => {

      if (child.mount) { // child == Sprite

        child.mount(this.elm);

      } else { // child == DOM element

        this.elm.appendChild(child);

      }

    });

    this.log(this.type + '.mount():', this.id, '- Done, parentElm =', parentElm);

    return this;

  }


  dismountChild(child) {

    const childIndex = this.children.indexOf(child);
    this.children.splice(childIndex, 1);
    if (child.dismount) { // child == Sprite

      child.dismount();

    } else { // child == DOM element

      child.remove();

    }

  }


  dismount() {

    this.mounted = false;

    this.children.forEach(child => {

      if (child.mounted) { child.mounted = false; }

    });

    this.elm.remove(); // Also removes child nodes!

    return this.elm;

  }


  render() {

    if (this.valueChanged) { this.updateElementContent(); }
    if (this.stateChanged || this.classUpdated) { this.updateElementClass(); }
    if (this.styleDataUpdated) { this.updateElementStyle(); }

    this.classUpdated = false;
    this.styleDataUpdated = false;

  }


  update(now, dt) {

    if (this.animator) {

      let animation = this.animator.update(now, dt);

      if (animation) {

        let frame = animation.currentFrame;

        this.bgTop  = frame.top;
        this.bgLeft = frame.left;
        this.width  = frame.width;
        this.height = frame.height;

        this.hw = (this.width / 2)|0;
        this.hh = (this.height / 2)|0;

        if (this.animator.animationChanged || animation.frameChanged || this.firstRender) {

          this.className = animation.className;

          if (frame.flipH) { this.className += ' flipH'; }
          if (frame.flipV) { this.className += ' flipV'; }

          this.classUpdated = true;

          //this.log('frame.flipH =', frame.flipH, ', sprite.id:', this.id,
          //  ', sprite.className:', this.className);

        }

      }

    }

    this.updateElementStyleData();

  }


  updateElementStyleData() {

    if (this.styleDataNeedsUpdate()) {

      this.styleData = {
        x      : this.x,
        y      : this.y,
        width  : this.width,
        bgTop  : this.bgTop,
        bgLeft : this.bgLeft,
        width  : this.width,
        height : this.height
      };

      this.styleDataUpdated = true;

    }

  }


  styleDataNeedsUpdate() {

    let styleData = this.styleData;

    return (
      styleData.x      !== this.x     ||
      styleData.y      !== this.y     ||
      styleData.width  !== this.width ||
      styleData.bgTop  !== this.bgTop ||
      styleData.bgLeft !== this.bgLeft

    );

  }


  updateElementContent(content) {

    this.elm.innerHTML = content || this.value;

  }


  updateElementStyle() {

    let styleStr = 'left:' + this.x + 'px;top:' + this.y + 'px;'
      + 'height:' + this.height + 'px;width:'  + this.width  + 'px;';

    if (this.animator) {

      styleStr += 'background-position:-' + this.bgLeft + 'px ' + this.bgTop + 'px;';

    }

    this.elm.style = styleStr;

  }


  updateElementClass() {

    const classNames = [];

    if (this.className) {

      classNames.push(this.className);

    }

    if (this.type) {

      classNames.push(this.type);

    }

    if (this.state) {

      classNames.push(this.state);

    }

    if (classNames.length) {

      this.elm.className = classNames.join(' ');

    }

  }


} // End: Sprite Class
