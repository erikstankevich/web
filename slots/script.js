const emojis = ["🍎", "🍒",  "💎", "🍋", "🍀"];

const reel1 = document.getElementById("reel1");
const reel2 = document.getElementById("reel2");
const reel3 = document.getElementById("reel3");

const spin= document.getElementById("spin");
const result = document.getElementById("result");
const money = document.getElementById("money");

let moneyvalue = 10;
money.textContent = "$ " + moneyvalue;

function randomEmoji() {
  return emojis[Math.floor(Math.random() * emojis.length)];
}


spin.addEventListener("click", () => {

  if (moneyvalue <= 0) {
    result.textContent = "0"
    return;
  }
  
  moneyvalue -= 1;


  const r1 = randomEmoji();
  const r2 = randomEmoji();
  const r3 = randomEmoji();

  reel1.textContent = r1;
  reel2.textContent = r2;
  reel3.textContent = r3;
});


