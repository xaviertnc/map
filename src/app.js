/**
 *
 * APP CLASS
 *
 * @author: Neels Moller
 * @date: 09 February 2020
 *
 */

class App {

  constructor(engine) {

      this.nextId = 0;
      this.engine = engine;
      this.log = engine.log;

      this.log('New App() - Start');

      const map = new Map('map', this);

      this.unplacedItems = [
        { standType: 'Tema'  , booked: false, x: 10 , y: 10  },
        { standType: 'Tema'  , booked: false, x: 100, y: 100 },
        { standType: 'Junior', booked: true , x: 150, y: 200 }
      ];

      map.addItem({ standType: 'Vermaak' , booked: false, x: 150, y: 200 });
      map.addItem({ standType: 'Kos'     , booked: true , x: 160, y: 220 });
      map.addItem({ standType: 'Onderwys', booked: false, x: 170, y: 240 });

      this.map = map;

      this.log('app.contructor() - Done', this);

  }


  build() {

    this.map.build();

  }


  mount() {

    this.map.mount();

  }

} // End: App Class
