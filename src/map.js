/**
 *
 * MAP CLASS
 *
 * @author: Neels Moller
 * @date: 09 February 2020
 *
 */

class Map extends View {


  addItem(mapItemDef) {

    const mapItem = new MapItem('item-' + this.nextId++, this, mapItemDef)

    this.addChild(mapItem);

  }


} // End: Map Class
