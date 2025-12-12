const emojis = ["🍎", "🍒", "💎", "🍋", "🍀"];

const reel1 = document.getElementById("reel1");
const reel2 = document.getElementById("reel2");
const reel3 = document.getElementById("reel3");

const spin = document.getElementById("spin");
const auto = document.getElementById("auto");
const result = document.getElementById("result");
const money = document.getElementById("money");

let moneyvalue = 10;
money.textContent = "$ " + moneyvalue;

let autoInterval = null;

function animate(reel) {
  reel.classList.add("spin");
  setTimeout(() => reel.classList.remove("spin"), 200);
}

function randomEmoji() {
  return emojis[Math.floor(Math.random() * emojis.length)];
}

function checkWin(r1, r2, r3) {
  if (r1 === r2 && r2 === r3) {
    return "three";
  } else {
    return "none";
  }
}

function applyWin(winType) {
  let reward = 0;

  if (winType === "three") {
    reward = Math.floor(Math.random() * 5) +1;
  }

  if (reward > 0) {
    moneyvalue += reward;
    money.textContent = "$ " + Math.floor(moneyvalue * 10) / 10;
    result.textContent = "win";
  } else {
    result.textContent = "no win";
  }
}

function doSpin() {
  if (moneyvalue <= 0) {
    result.textContent = "0";
    return;
  }

  moneyvalue -= 0.1;
  money.textContent = "$ " + Math.floor(moneyvalue * 10) / 10;

  animate(reel1);
  animate(reel2);
  animate(reel3);

  let duration = 400;
  let start = Date.now();

  let interval = setInterval(() => {
    reel1.textContent = randomEmoji();
    reel2.textContent = randomEmoji();
    reel3.textContent = randomEmoji();

    if (Date.now() - start > duration) {
      clearInterval(interval);

      const r1 = randomEmoji();
      const r2 = randomEmoji();
      const r3 = randomEmoji();

      reel1.textContent = r1;
      reel2.textContent = r2;
      reel3.textContent = r3;

      const winType = checkWin(r1, r2, r3);
      applyWin(winType);
    }
  }, 50);
}

spin.addEventListener("click", doSpin);

auto.addEventListener("click", () => {
  if (autoInterval) {
    clearInterval(autoInterval);
    autoInterval = null;
    auto.textContent = "auto";
    return;
  }

  auto.textContent = "stop";

  autoInterval = setInterval(() => {
    if (moneyvalue <= 0) {
      clearInterval(autoInterval);
      autoInterval = null;
      auto.textContent = "auto";
      return;
    }
    doSpin();
  }, 1300);
});

