setTimeout(() => {

  const 
  { 
    Engine, Render, Runner, Bodies, Composite, Events, Mouse, World, Body 
  } = Matter;

  // ----- ENGINE -----
  const engine = Engine.create();
  engine.gravity.y = 1;
  const world = engine.world;

  // ----- RENDER -----
  const render = Render.create({canvas: document.getElementById("world"),engine,options: { width: 500, height: 500, wireframes: false, background: "#000" }});

  Render.run(render);
  Runner.run(Runner.create(), engine);

  // ----- FLIPPERS -----
  const flipperWidth = 150;
  const flipperHeight = 15;
  const flipperY = 430;

  const leftFlipper = Bodies.rectangle(125, flipperY, flipperWidth, flipperHeight, 
  {isStatic: true, friction: 0, restitution: 0.9, render: { fillStyle: "#ccc" }});

  const rightFlipper = Bodies.rectangle(375, flipperY, flipperWidth, flipperHeight, 
  {isStatic: true, friction: 0, restitution: 0.9, render: { fillStyle: "#ccc" }});

  Composite.add(world, [leftFlipper, rightFlipper]);

  // ----- PEGS -----
  const pegs = [];
  const pegCount = 15;

  for (let i = 0; i < pegCount; i++) 
  {
    pegs.push(Bodies.circle(125 + (Math.random()-0.5)*200, 250 + (Math.random()-0.5)*200, 4, { isStatic: true, restitution: 1.1, friction: 0, render: { fillStyle: "#888" } }));
  }

  for (let i = 0; i < pegCount; i++) 
  {
    pegs.push(Bodies.circle(375 + (Math.random()-0.5)*200, 250 + (Math.random()-0.5)*200, 4, { isStatic: true, restitution: 1.1, friction: 0, render: { fillStyle: "#888" } }));
  }

  Composite.add(world, pegs);

  // ----- T-OBJECT -----
  const splitterStem = Bodies.rectangle(250, 60, 20, 60, { isStatic: true, render: { fillStyle: "#ccc" } });
  const splitterTop = Bodies.rectangle(250, 40, 250, 20, { isStatic: true, render: { fillStyle: "#ccc" } });
  Composite.add(world, [splitterStem, splitterTop]);

  // ----- FLIP CONTROL -----
  let leftAngle = +0.1, rightAngle = -0.1;
  const LEFT_UP = +0.3, LEFT_DOWN = +0.1, RIGHT_UP = -0.3, RIGHT_DOWN = -0.1;

  Events.on(engine, "beforeUpdate", () => {Body.setAngle(leftFlipper, leftAngle);Body.setAngle(rightFlipper, rightAngle);});

  document.addEventListener("mousedown", (e) => const x = e.clientX - render.canvas.getBoundingClientRect().left;if (x < 250) leftAngle = LEFT_UP;else rightAngle = RIGHT_UP);

  document.addEventListener("mouseup", () => {
    leftAngle = LEFT_DOWN;
    rightAngle = RIGHT_DOWN;
  });

  // ----- TELEPORT SENSOR -----
  const teleportSensor = Bodies.rectangle(250, 50, 18, 80, { isStatic: true, isSensor: true, render: { visible: false } });
  Composite.add(world, teleportSensor);

  // ----- FUNCTION TO SPAWN BALL -----
  function spawnBall() {
    const newBall = Bodies.circle(render.options.width/2, 480, 10, {
      restitution: 0.8,
      render: { fillStyle: 'green' }
    });
    World.add(world, newBall);
    Body.setVelocity(newBall, { x: 0, y: -20 });
    return newBall;
  }

  // ----- INITIAL BALL -----
  let ball = spawnBall();

  // ----- FLIPPER COLLISION SPAWN -----
  Events.on(engine, "collisionStart", event => {
    event.pairs.forEach(pair => {
      const bodies = [pair.bodyA, pair.bodyB];

      if (bodies.includes(leftFlipper) || bodies.includes(rightFlipper)) {
        bodies.forEach(b => {
          if (b.label === 'Circle Body') {
            const side = bodies.includes(leftFlipper) ? -1 : 1;
            Body.setVelocity(b, { x: side * (-1.5 + (Math.random()-0.5)*1.7*2), y: -15 });

            // спавним новый шар при касании флиппера
            spawnBall();
          }
        });
      }

      // телепорт шаров
      if (bodies.includes(teleportSensor)) {
        bodies.forEach(b => {
          if (b.label === 'Circle Body') {
            Body.setStatic(b, true);
            b.render.visible = false;

            setTimeout(() => {
              const dropX = Math.random() < 0.5 ? 125 : 375;
              Body.setPosition(b, { x: dropX, y: 60 });
              b.render.visible = true;
              Body.setStatic(b, false);
              Body.setVelocity(b, { x: 0, y: 2 });
            }, 500);
          }
        });
      }
    });
  });

}, 500);
