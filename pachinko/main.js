const 
{ 
  Engine, Render, Runner, Bodies, Composite, Events, Mouse, MouseConstraint } = Matter;

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
  render.options.height / 2,
  20,
  {
    restitution: 0.8,
    render:
    {
      fillStyle: 'green'
    }
  });
World.add(world, ball);

Body.setVelocity(ball, { x:0, y: -10});

