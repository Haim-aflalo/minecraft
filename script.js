function getStoneType() {
  const types = ['redstone', 'coal', 'stones', 'diamond', 'gold'];
  return types[Math.floor(Math.random() * types.length)];
}

function genBoard() {
  const board = document.getElementById('game-container');
  const items = document.getElementById('items');
  for (let i = 0; i < 25; i++) {
    for (let j = 0; j < 40; j++) {
      const tile = document.createElement('div');
      tile.className = 'sky';
      if (i >= 19) {
        if (i === 19 && j < 4) {
          tile.className = 'soil';
        } else {
          tile.className = 'stone';
          tile.id = getStoneType();
        }
      } else if (i >= 15) {
        tile.className = 'soil';
        if ((i === 15 && j > 13) || (i === 16 && j < 14)) {
          tile.className = 'grass';
        }
        if (i === 15 && j < 14) {
          tile.className = 'sky';
        }
      }
      tile.addEventListener('click', (event) => {
        const item = document.createElement('div');
        item.id = event.target.id;
        item.className = event.target.className;
        if (event.target.id !== 'sky') {
          items.append(item);
          tile.className = 'sky';
          tile.id = 'sky';
        }
      });
      board.appendChild(tile);
    }
  }
}

const reset = document.getElementById('reset');
reset.addEventListener('click', () => {
  window.location.reload();
});

function change() {
  const ax = document.getElementById('ax');
  const shovel = document.getElementById('shovel');
  const sword = document.getElementById('sword');
  const pickaxe = document.getElementById('pickaxe');
  ax.addEventListener('click', () => {
    document.body.style.cursor = "url('images/ax.ico'), none";
  });
  shovel.addEventListener('click', () => {
    document.body.style.cursor = "url('images/shovel.ico'), none";
  });
  sword.addEventListener('click', () => {
    document.body.style.cursor = "url('images/sword.ico'), none";
  });
  pickaxe.addEventListener('click', () => {
    document.body.style.cursor = "url('images/pickaxe.ico'), none";
  });
}

function getItems() {
  box.addEventListener('click', () => {
    if (items.style.display === 'none' || items.style.display === '') {
      items.style.display = 'block';
    } else {
      items.style.display = 'none';
    }
  });
}

function play() {
  genBoard();
  change();
  getItems();
}

play();
