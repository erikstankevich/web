const reels = document.querySelectorAll('.reel .symbols');

document.getElementById('spin').addEventListener('click', () => {
  reels.forEach((symbols, index) => {
    symbols.style.animation = 'none';
    symbols.offsetHeight; // force reflow

    // spin for 1.5s
    symbols.style.animation = 'spin 1.5s linear';

    // stop each reel randomly after staggered delay
    setTimeout(() => {
      symbols.style.animation = 'none';
      const totalSymbols = symbols.children.length;
      const randomIndex = Math.floor(Math.random() * totalSymbols);
      symbols.style.transform = `translateY(-${randomIndex * 80}px)`;
    }, 1500 + index * 500); // stagger stops for realism
  });
});

