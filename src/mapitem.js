/**
 *
 * MAP ITEM CLASS
 *
 * @author: Neels Moller
 * @date: 09 February 2020
 *
 */

class MapItem extends Sprite {


  constructor(id, parent, props) {

      super(id, parent);

      this.width  = 32;
      this.height = 32;
      this.elLabel = null;

      if (props) { this.init(props); }

  }


  build() {

    super.build();

    this.elLabel = document.createElement('label');
    this.elLabel.innerText = this.standNo || this.id;
    this.elm.appendChild(this.elLabel);

    return this;

  }


  updateElementClass() {

    let className = this.type + ' ' + this.standType;

    if (this.state) {

      className += ' ' + this.state;

    }

    if (this.booked) {

      className += ' booked';

    }

    this.elm.className = className;
 
  }


} // End: MapItem Class
