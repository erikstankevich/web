const icon_width = 79,
      icon_height = 79,
      num_icons = 9,
      time_per_icon = 100;

let indexes = [0, 0, 0, 0, 0]; // для 5 барабанов

const roll = (reel, offset = 0) => {
  const delta = (offset + 2) * num_icons + Math.floor(Math.random() * num_icons);

  // Получаем текущее положение фона
  const style = getComputedStyle(reel);
  const backgroundPositionY = parseFloat(style.backgroundPositionY) || 0;

  // Анимация
  reel.style.transition = `background-position-y ${delta * time_per_icon}ms ease-out`;
  reel.style.backgroundPositionY = `${backgroundPositionY + delta * icon_height}px`;
}

function rollAll() {
  const reelList = document.querySelectorAll('.slots > .reel');
  reelList.forEach((reel, i) => {
    roll(reel, 1);
  });
}

// Запуск анимации
rollAll();

