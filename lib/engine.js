/**
 *
 * ENGINE
 *
 * @author: Neels Moller
 * @date: 09 February 2020
 *
 */

class Engine {


  constructor(config) {

    NM.log('');
    NM.log('Construct Engine - Start, config =', config);
    NM.log('------------------------------');

    this.log = NM.log;

    this.config = config;

    this.lib = new Lib();

    this.now = this.lib.getTime; // Shortcut

    this.step = this.step.bind(this); // reqAnimFrame Callback

    NM.log('');
    this.view = new View('main-view', this);
    this.view.mount();

    NM.log('');
    this.debugView = new View('debug-pane', this);
    this.debugView.mount();

    NM.log('');
    this.input = new InputService(this);
    this.input.init(this);
    this.input.mount();

    NM.log('');
    this.stopBtn = document.getElementById('stop');
    this.startBtn = document.getElementById('start');
    this.restartBtn = document.getElementById('restart');

    NM.log('------------------------------');
    NM.log('Construct Engine - Done');

  }


  /**
    * The idea behind init() is to enable us
    * to "reset" the game.
    *
    */
  init() {

    this.log('');
    this.log('');
    this.log('Add Dynamic Objects - Start');
    this.log('------------------------------');

    this.fps = 0;
    this.nextId = 0;
    this.lastTime = 0;
    this.startTime = 0;
    this.stepTimer = null;
    this.state = 'Idle';

    NM.log('');
    this.app = new App(this);
    this.app.build();
    this.app.mount();

    this.elFps = this.debugView.mountChild('fps');

    this.log('');
    this.log('----------------------');
    this.log('Add Dynamic Objects - Done,', this);

    return this;

  }


  dismount() {

    this.debugView.dismountChild('fps');

    return this;

  }


  restart(startState) {

    this.dismount().init().start(startState);

  }


  start(startState) {

    this.log('');
    this.log('Engine.start()');

    this.state = startState || 'Running';

    window.cancelAnimationFrame(this.stepTimer);

    if (this.state === 'Running') {
      this.startBtn.disabled = true;
      this.stopBtn.disabled = false;
    }

    this.startTime = this.now();

    this.step(this.startTime);

  }


  stop() {

    this.log('');
    this.log('Engine.stop()');

    window.clearTimeout(this.stepTimer);

    this.startBtn.disabled = false;
    this.stopBtn.disabled = true;

    this.state = 'Idle';

  }


  step(now) {

    let dt = now - this.lastTime;

    if (dt > 0) { this.fps = (1000 / dt)|0; }

    this.beforeUpdate(now, dt);

    this.update(now, dt);

    this.afterUpdate(now, dt);

    this.render();

    this.lastTime = now;

    if (this.state === 'Running') {

      this.stepTimer = window.requestAnimationFrame(this.step);

    }

  }


  beforeUpdate(now, dt) {

  }


  update(now, dt) {

    this.input.update(now, dt);

  }


  afterUpdate(now, dt) {

    this.input.afterUpdate(now, dt);

  }


  render() {

    this.elFps.innerText = 'Fps: ' + this.fps;

  }

}; // end: GameEngine class
