const emojis = ["🍎", "🍒",  "💎", "🍋", "🍀"];

const reel1 = document.getElementById("reel1");
const reel2 = document.getElementById("reel2");
const reel3 = document.getElementById("reel3");

const spin= document.getElementById("spin");
const auto=document.getElementById("auto");
const result = document.getElementById("result");
const money = document.getElementById("money");

let moneyvalue = 10;
money.textContent = "$ " + moneyvalue;

let autoInterval = null;

function randomEmoji() {
  return emojis[Math.floor(Math.random() * emojis.length)];
}



function doSpin() 
{
  if (moneyvalue <= 0) {
    result.textContent = "0"
    return;
  }
  
  moneyvalue -= 0.1;
  money.textContent = "$ " + Math.floor(moneyvalue*10)/10;


  const r1 = randomEmoji();
  const r2 = randomEmoji();
  const r3 = randomEmoji();

  reel1.textContent = r1;
  reel2.textContent = r2;
  reel3.textContent = r3;
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
    }, 1000);
});


