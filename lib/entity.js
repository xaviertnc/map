/**
 *
 * ENTITY CLASS
 *
 * @author: Neels Moller
 * @date: 05 February 2020
 *
 */

class Entity {


  constructor(id, parent, props) {

    this.id = id;
    this.type = this.constructor.name;
    this.parent = parent;
    this.engine = parent.engine ? parent.engine : parent;

    this.log = this.engine.log;
    this.log('New', this.type + '():', id);

    this.state = null;
    this.lastState = null;
    this.stateChanged = false;

    this.value = null;
    this.lastValue = null;
    this.valueChanged = false;

    this.children = [];

    this.nextId = 0;

    if (props) { this.init(props); }

  }


  init(props) {

    this.log(this.type + '.init(): ' + this.id + ', props', props ? props : {});
    for (let prop in props) { this[prop] = props[prop]; }
    this.log(this.type + '.init():', this.id, '- Done,', this);

    return this;

  }


  addChild(objChild) {

    this.children.push(objChild)

  }


  getChild(id) {

    const childrenFound = this.children.filter(objChild => objChild.id === id);

    return childrenFound.length ? childrenFound[0] : null;

  }


  beforeUpdate(now, dt) {}


  update(now, dt) {}


  afterUpdate(now, dt) {

    this.stateChanged = (this.state !== this.lastState);
    this.lastState = this.state;

    this.valueChanged = (this.value !== this.lastValue);
    this.lastValue = this.value;

  }


} // End: Entity Class
