const {
  Engine,
  Render,
  Runner,
  Bodies,
  Composite,
  Mouse,
  MouseConstraint
} = Matter;

// ----- ENGINE -----
const engine = Engine.create();
engine.gravity.y = 1;

const world = engine.world;

// ----- RENDER -----
const render = Render.create({
  canvas: document.getElementById("world"),
  engine,
  options: {
    width: 500,
    height: 500,
    wireframes: false,
    background: "#000"
  }
});

Render.run(render);
Runner.run(Runner.create(), engine);

const { Constraint, Events } = Matter;

const flipperWidth = 80;
const flipperHeight = 15;
const flipperY = 430;

const leftFlipper = Bodies.rectangle(
  180,
  flipperY,
  flipperWidth,
  flipperHeight,
  {
    density: 0.004,
    friction: 0,
    frictionAir: 0.001,
    restitution: 0.9,
  }
);

const leftPivot = Constraint.create({
  pointA: { x:140, y: flipperY },
  bodyB: leftFlipper,
  pointB: { x:-flipperWidth / 2, y: 0},
  stiffness: 1,
  length: 0
});

Composite.add(world, [
  leftFlipper,
  leftPivot
]);

