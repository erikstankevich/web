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
  Bodies.rectangle(350, 400, 40, 800, { isStatic: true }),
  Bodies.rectangle(300, 0, 600, 40, { isStatic: true })
];

Composite.add(world, walls);

// ----- PEGS -----
const pegRadius = 9;

const pegs = 
  [
    Bodies.polygon(200, 260, 3, pegRadius, 
      { 
        isStatic: true,
        isSuperPeg: true,
        render: { fillStyle: "#ff0" }
      })
  ];

Composite.add(world, pegs);

// ----- BALL DROP -----
function dropBall(x = 30) {
  const ball = Bodies.circle(80, 40, 8, {
    label: "Ball",
    restitution: 1.1,   // bounciness
    friction: 0.001,
    density: 0.002,
    render: { fillStyle: "#fff" },
    hasSpawnedExtra: false
  });
  Composite.add(world, ball);
}

// ----- CLICK TO DROP -----
document.addEventListener("click", (e) => {
  const rect = render.canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  dropBall(x);
});


const NORMAL_PEG_BOOST = 1.2;
const SUPER_PEG_BOOST = 2.0;


Matter.Events.on(engine, "collisionStart", function(event) {
  event.pairs.forEach(pair => {
    const { bodyA, bodyB } = pair;

    const ball =
      bodyA.label === "Ball" ? bodyA :
      bodyB.label === "Ball" ? bodyB :
      null;

    const peg =
      pegs.includes(bodyA) ? bodyA :
      pegs.includes(bodyB) ? bodyB :
      null;

    if (ball && peg) {
      const boost = peg.isSuperPeg ? SUPER_PEG_BOOST : NORMAL_PEG_BOOST;

      Matter.Body.setVelocity(ball, {
        x: ball.velocity.x * boost,
        y: ball.velocity.y * boost
      });

      if (peg.isSuperPeg && !ball.hasSpawnedExtra) 
      {
        ball.hasSpawnedExtra = true;

        dropBall (80);
      }
    }
  });
});

