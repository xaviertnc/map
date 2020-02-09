/**
 * WELCOME TO MAP EDITOR!
 *
 * @author: Neels Moller
 * @date: 09 Feb 2020
 *
 */

NM.log = NM.config.debug ? console.log : function(){};

NM.log('Welcome to Map Editor v0.1!');


window.onload = function() {

  NM.engine = new Engine(NM.config);
  NM.engine.init().start('Idle');

};
