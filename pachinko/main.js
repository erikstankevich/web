const 
{ 
  Engine, Render, Runner, Bodies, Composite, Events, Mouse, MouseConstraint, World, Body } = Matter;

// ----- ENGINE -----
const engine = Engine.create();
engine.gravity.y = 1;
const world = engine.world;

// ----- RENDER -----
const render = Render.create({
  canvas: document.getElementById("world"),
  engine,
  options: 
  {
    width: 500,
    height: 500,
    wireframes: false,
    background: "#000"
  }
});

Render.run(render);
Runner.run(Runner.create(), engine);

// ----- FLIPPERS -----
const flipperWidth = 220;
const flipperHeight = 15;
const flipperY = 430;

// left flipper
const leftFlipper = Bodies.rectangle(125, flipperY, flipperWidth, flipperHeight, {
  isStatic: true,
  friction: 0,
  restitution: 0.9,
  render: { fillStyle: "#ccc" }
});

// right flipper
const rightFlipper = Bodies.rectangle(375, flipperY, flipperWidth, flipperHeight, {
  isStatic: true,
  friction: 0,
  restitution: 0.9,
  render: { fillStyle: "#ccc" }
});

const teleportSensor = Bodies.rectangle(250, 50, 18, 80, {
  isStatic: true,
  isSensor: true,
  render:
  {
    //fillStyle:"#555" 
    visible: false
  }
});
Composite.add(world, teleportSensor);

Composite.add(world, [leftFlipper, rightFlipper]);

// ----- FLIP CONTROL -----
let leftAngle = +0.1;  // resting angle
let rightAngle =-0.1;  // resting angle
const LEFT_UP = +0.3;
const LEFT_DOWN = +0.1;
const RIGHT_UP = -0.3;
const RIGHT_DOWN = -0.1;

// rotate flippers every update
Events.on(engine, "beforeUpdate", () => {
  Matter.Body.setAngle(leftFlipper, leftAngle);
  Matter.Body.setAngle(rightFlipper, rightAngle);
});

// T-Object
const splitterStem = Bodies.rectangle(250, 60, 20, 60, {
  isStatic: true,
  render: { fillStyle: "#fff"}
});

const splitterTop = Bodies.rectangle(250, 40, 250, 20, {
  isStatic: true,
  render: {fillStyle: '#fff'}
});

Composite.add(world, [splitterStem, splitterTop]);

// ----- MOUSE CONTROL -----
const mouse = Mouse.create(render.canvas);

render.mouse = mouse;

document.addEventListener("mousedown", (e) => {
  const x = e.clientX - render.canvas.getBoundingClientRect().left;
  if (x > 0) leftAngle = LEFT_UP;     // left side click
  if (x < 500) rightAngle = RIGHT_UP;   // right side click
});

document.addEventListener("mouseup", (e) => {
  leftAngle = LEFT_DOWN;
  rightAngle = RIGHT_DOWN;
});


const ball = Bodies.circle(
  render.options.width /2,
  500,
  10,
  {
    restitution: 0.8,
    render:
    {
      fillStyle: 'green'
    }
  });

Events.on(engine, "collisionStart", event => {
  event.pairs.forEach(pair => {
    if (pair.bodyA === teleportSensor || pair.bodyB === teleportSensor) {
      Body.setStatic(ball, true);
      ball.render.visible = false;

      setTimeout(() => {
        const dropX = Math.random() < 0.5 ? 125 :375;
      
        ball.render.visible = true;
        Body.setStatic(ball, false);
        Body.setPosition(ball, {x: dropX, y: 60 });
        Body.setVelocity(ball, {x: 0, y: 2 });
      }, 500);
    }
  });
});

/*
Events.on(engine, "collisionStart", event => {
  event.pairs.forEach(pair => {
    const bodies = [pair.bodyA, pair.bodyB];
    const hitBall = bodies.includes(ball);
    const hitLeft = bodies.includes(leftFlipper);
    const hitRight = bodies.includes(rightFlipper);

    if (hitBall && (hitLeft || hitRight))
    {
      Body.setStatic(ball, true);
      setTimeout(() => {
        const dropX = Math.random() < 0.5 ? 125 :375;
    
        ball.render.visible = true;
        Body.setStatic(ball, false);
        //Body.setPosition(ball, {x: ball.position.x, y: ball.position.y - 50 });
        Body.setVelocity(ball, {x: 0, y: -2 });
      }, 500);

    }
  });
});*/
Events.on(engine, "collisionActive", event => {
  event.pairs.forEach(pair => {
    const bodies = [pair.bodyA, pair.bodyB];

    if (
      bodies.includes(ball) &&
      (bodies.includes(leftFlipper) || bodies.includes(rightFlipper))
    ) {
      const side = bodies.includes(leftFlipper) ? -1 : 1;

      Body.setVelocity(ball, {
        x: side * 4, // sideways kick
        y: -12       // strong upward
      });
    }
  });
});



World.add(world, ball);
Body.setVelocity(ball, { x:0, y: -20});

