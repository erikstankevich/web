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
    width: 600,
    height: 400,
    wireframes: false,
    background: "#000"
  }
});

Render.run(render);
Runner.run(Runner.create(), engine);

// ----- WALLS -----
const walls = [
  Bodies.rectangle(300, 400, 600, 40, { isStatic: true }), // floor
  Bodies.rectangle(50, 400, 40, 800, { isStatic: true }), // left
  Bodies.rectangle(350, 400, 40, 800, { isStatic: true })  // right
];

Composite.add(world, walls);

// ----- PEGS -----
const pegRadius = 13;

for (let y = 50; y < 300; y += 40) {
  for (let x = 50; x < 300; x += 40) {
    const offset = (y / 80) % 2 ? 40 : 0;
    const peg = Bodies.circle(x + offset, y, pegRadius, {
      isStatic: true,
      render: { fillStyle: "#0ff" }
    });
    Composite.add(world, peg);
  }
}

// ----- BALL DROP -----
function dropBall(x = 300) {
  const ball = Bodies.circle(x, 40, 8, {
    restitution: 1.1,   // bounciness
    friction: 0.001,
    density: 0.002,
    render: { fillStyle: "#fff" }
  });
  Composite.add(world, ball);
}

// ----- CLICK TO DROP -----
document.addEventListener("click", (e) => {
  const rect = render.canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  dropBall(x);
});

// ----- OPTIONAL: MOUSE DRAG -----
const mouse = Mouse.create(render.canvas);
const mouseConstraint = MouseConstraint.create(engine, {
  mouse,
  constraint: {
    stiffness: 0.2,
    render: { visible: false }
  }
});

Composite.add(world, mouseConstraint);
render.mouse = mouse;

