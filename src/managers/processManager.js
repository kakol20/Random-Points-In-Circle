const ProcessManager = (function () {
  function DrawPoint(center = { x: 0, y: 0 }, radius = 1, chosen = { x: 0, y: 0 }) {
    const pos = {
      x: center.x + (chosen.x * radius),
      y: center.y + (chosen.y * radius)
    };

    strokeWeight(1.5);
    stroke(255, 128);
    point(pos.x, pos.y);
  }

  function DrawLabel(center = { x: 0, y: 0 }, radius = 1, label = '') {
    strokeWeight(2.5);
    stroke(86, 192);
    noFill();
    ellipseMode(CENTER);
    circle(center.x, center.y, radius * 2);

    strokeWeight(3);
    textSize(15);
    stroke(24, 192);
    fill(255);
    textAlign(CENTER, TOP);
    text(label, center.x, center.y - radius);
  }

  let state = 'nothing';

  const maxFPS = 60;
  Timing.maxTime = 1000 / maxFPS;

  const debugStates = true;

  let universalSeed = new Date() / 1.;

  let count = 0;
  const maxArrSize = 3141;

  let canvasSize = 0;

  function RejectionState() {
    Timing.start();

    const center = {
      x: canvasSize / 4,
      y: canvasSize / 4
    };
    const radius = (canvasSize / 4) - 10;

    // DrawCircle(center, radius);

    while (true) {
      let chosen = {
        x: (Random.randFloat() * 2) - 1,
        y: (Random.randFloat() * 2) - 1
      };

      while (chosen.x * chosen.x + chosen.y * chosen.y > 1) {
        chosen.x = (Random.randFloat() * 2) - 1;
        chosen.y = (Random.randFloat() * 2) - 1;
      }

      DrawPoint(center, radius, chosen);

      count++;
      if (count >= maxArrSize) {
        Random.seed = universalSeed >>> 0;
        count = 0;

        DrawLabel(center, radius, 'Rejection Sampling');

        ProcessManager.changeState('polarUnmodfied');
        break;
      }

      if (Timing.checkTime()) break;
    }
  }

  function PolarUnmodifiedState() {
    Timing.start();

    const center = {
      x: (3 * canvasSize) / 4,
      y: canvasSize / 4
    };
    const radius = (canvasSize / 4) - 10;

    while (true) {
      const angle = Random.randFloat() * Math.PI * 2;
      const length = Random.randFloat();

      const chosen = {
        x: length * Math.cos(angle),
        y: length * Math.sin(angle)
      };

      DrawPoint(center, radius, chosen);

      count++;
      if (count >= maxArrSize) {
        Random.seed = universalSeed >>> 0;
        count = 0;

        DrawLabel(center, radius, 'Polar Unmodified');

        ProcessManager.changeState('polarSqrt');
        break;
      }

      if (Timing.checkTime()) break;
    }
  }

  function PolarSqrtState() {
    Timing.start();

    const center = {
      x: (2 * canvasSize) / 4,
      y: (3 * canvasSize) / 4
    };
    const radius = (canvasSize / 4) - 10;

    while (true) {
      const angle = Random.randFloat() * Math.PI * 2;
      const length = Math.sqrt(Random.randFloat());

      const chosen = {
        x: length * Math.cos(angle),
        y: length * Math.sin(angle)
      };

      DrawPoint(center, radius, chosen);

      count++;
      if (count >= maxArrSize) {
        Random.seed = universalSeed >>> 0;
        count = 0;

        DrawLabel(center, radius, 'Inverse Transform\nSampling');

        ProcessManager.changeState('next');
        break;
      }

      if (Timing.checkTime()) break;
    }
  }

  return {
    changeState(s) {
      state = s;

      if (debugStates) console.log('State Change: ' + s);
    },

    setup() {
      this.changeState('init');

      canvasSize = width;
    },

    draw(dt) {
      let center = { x: 0, y: 0 };
      // let chosen = { x: 0, y: 0 };
      let radius = 0;

      switch (state) {
        case 'init':
          background(28);
          universalSeed = (new Date() * 1) >>> 0;
          Random.seed = universalSeed >>> 0;
          console.log('Seed set to', universalSeed);

          count = 0;

          this.changeState('rejection');
          break;
        case 'rejection':
          RejectionState();
          break;
        case 'polarUnmodfied':
          PolarUnmodifiedState();
          break;
        case 'polarSqrt':
          PolarSqrtState();
          break;
        default:
          // do nothing
          break;
      }
    }
  }
})()