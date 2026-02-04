let cursor;
let counter = {
  trunk: 0,
  leaves: 0,
  grass: 0,
  soil: 0,
  stone: 0,
  redstone: 0,
  diamond: 0,
  coal: 0,
  gold: 0,
};

function getStoneType() {
  const types = ['redstone', 'coal', 'stone', 'diamond', 'gold'];
  return types[Math.floor(Math.random() * types.length)];
}

function genBoard() {
  const board = document.getElementById('game-container');
  const items = document.getElementById('items-active');
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
        if ((i === 15 && j > 13) || (i === 16 && j < 15)) {
          tile.className = 'grass';
        }
        if (i === 15 && j < 15) {
          tile.className = 'sky';
        }
      }

      if (i > 11 && i < 16 && ((j > 4 && j < 7) || (j > 11 && j < 13))) {
        tile.className = 'trunk';
      }
      if (i > 10 && i < 15 && ((j > 17 && j < 20) || (j > 24 && j < 27))) {
        tile.className = 'trunk';
      }
      if (i > 11 && i < 16 && ((j > 4 && j < 7) || (j > 11 && j < 13))) {
        tile.className = 'trunk';
      }

      tile.addEventListener('click', (event) => {
        const item = document.createElement('div');
        let count = document.createElement('p');
        count.id = 'count';
        item.id = event.target.id;
        item.className = event.target.className;

        if (event.target.className !== 'sky') {
          if (cursor == 'pickaxe' && event.target.className === 'stone') {
            counter[event.target.id] += 1;
            if (counter[event.target.id] === 1) {
              items.append(item);
            } else {
              count.innerText = counter[event.target.id];
              item.append(count);
              console.log(item);
            }
            event.target.className = 'sky';
            event.target.id = '';
          }

          if (
            cursor == 'shovel' &&
            (event.target.className === 'soil' ||
              event.target.className === 'grass')
          ) {
            counter[event.target.className] += 1;
            if (counter[event.target.className] === 1) {
              items.append(item);
            } else {
              count.textContent = counter[event.target.className];
              item.append(count);
            }
            event.target.className = 'sky';
          }

          if (
            cursor == 'ax' &&
            (event.target.className === 'trunk' ||
              event.target.className === 'leaves')
          ) {
            counter[event.target.className] += 1;
            if (counter[event.target.className] === 1) {
              items.append(item);
            } else {
              count.innerText = counter[event.target.className];
              item.append(count);
            }
            event.target.className = 'sky';
          }
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
  const tools = document.querySelectorAll('#tools > *');
  tools.forEach((tool) => {
    tool.addEventListener('click', () => {
      document.body.style.cursor = `url('images/${tool.id}.ico'), auto`;
      cursor = tool.id;
    });
  });
}

function getItems() {
  const items = document.getElementById('items-active');
  const help = document.getElementById('items-empty');
  let flag = 1;
  box.addEventListener('click', () => {
    const isEmpty = items.querySelector('div') == null;
    if (items.style.display === 'none' || flag === 1) {
      items.style.display = 'grid';
      help.style.display = 'none';
      flag++;
    } else {
      if (isEmpty) {
        items.style.display = 'none';
        help.style.display = 'flex';
      } else {
        items.style.display = 'none';
        help.style.display = 'none';
      }
    }
  });
}

function play() {
  genBoard();
  change();
  getItems();
}

play();
