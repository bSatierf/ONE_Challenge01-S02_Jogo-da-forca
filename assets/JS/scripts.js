const palavras = ['ABACAXI', 'LARANJA', 'CAQUI', 'TANGERINA', 'BANANA', 'UVA', 'PERA', 'LIMAO'];
let letras = [];
let correctWordArr = [];
let secretLetterArr = [];

const startGameBtn = document.getElementById('btn-start-game');
const startScreen = document.querySelector('#start-screen');
const newWordBtn = document.getElementById('btn-new-word');
const screenAddWords = document.getElementById('screen-add-words');
const cancelBtn = document.querySelector('#btn-cancel');
const saveWord = document.querySelector('#btn-save-word');
const gameScreen = document.querySelector('#game-screen');
const newGameBtn = document.querySelector('#btn-new-game');
const quitBtn = document.querySelector('#btn-quit');
const modalWin = document.querySelector('#modal-win-lose');
const newGameModalBtn = document.getElementById('new-game-modal');
const exitModal = document.getElementById('exit-modal');
const titleModal = document.getElementById('title-modal');
const modal = document.getElementById('modal');

const board = document.getElementById('board').getContext('2d');
const newWordInput = document.querySelector('#new-word');
const startScreenClass = startScreen.className;
const wordScreenClass = screenAddWords.className;

let secretWord = '';
let correctWord = '';
let errors = 6;
let vitoria = false;
let vitoriaArrOk = false;
let startGame = false;

function splitSecretWord() {
  secretLetterArr = secretWord.split('');
  for (let i = 0; i < letras.length; i += 1) {
    secretLetterArr.push([i]);
  }
  return secretLetterArr;
}

function randomWord() {
  correctWordArr = [];
  secretLetterArr = [];
  const chosenWord = palavras[Math.floor(Math.random() * palavras.length)];
  secretWord = chosenWord;
  splitSecretWord();
  return chosenWord;
}

function drawLine() {
  board.lineWidth = 6;
  board.lineCap = 'round';
  board.lineJoin = 'round';
  board.strokeStyle = '#0A3871';
  board.beginPath();

  const axis = 600 / secretWord.length;
  for (let i = 0; i < secretWord.length; i += 1) {
    board.moveTo(300 + (axis * i), 640);
    board.lineTo(350 + (axis * i), 640);
  }
  board.stroke();
  board.closePath();
}

function newGame() {
  if (startScreenClass.indexOf('hidden') === -1) {
    startScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    letras = [];
    errors = 6;
    modalWin.classList.remove('show');
    board.clearRect(0, 0, 1200, 860);
    forca('#000');
    drawLine(randomWord());
    vitoria = false;
    vitoriaArrOk = false;
    startGame = true;
  }
}

function gameOver(error) {
  if (error === 0 && startGame === true) {
    const lose = 'Você perdeu! ';
    titleModal.textContent = lose + String.fromCodePoint(0X1F494);
    modalWin.classList.add('show');
  }
}

function newWordScreen() {
// newWordBtn.addEventListener('click', () => {
  if (wordScreenClass.indexOf('hidden') !== -1) {
    startScreen.classList.add('hidden');
    screenAddWords.classList.remove('hidden');
    startGame = false;
  }
}

function drawHead(x, y, radius, color) {
  board.lineWidth = 6;
  board.lineCap = 'round';
  board.lineJoin = 'round';
  board.strokeStyle = color;
  board.beginPath();
  board.arc(x, y, radius, 0, 2 * Math.PI);
  board.stroke();
}

function drawBody(x, y, x1, y1, color) {
  board.lineWidth = 6;
  board.lineCap = 'round';
  board.lineJoin = 'round';
  board.strokeStyle = color;
  board.beginPath();
  board.moveTo(x, y);
  board.lineTo(x1, y1);
  board.stroke();
}

function drawFullBody(error) {
  if (error === 5) {
    // desenha cabeça
    drawHead(600, 200, 40, '#0A3871');
  } if (error === 4) {
    drawBody(600, 240, 600, 390, '#0A3871');
  } if (error === 3) {
    drawBody(600, 390, 570, 470, '#0A3871');
  } if (error === 2) {
    drawBody(600, 390, 630, 470, '#0A3871');
  } if (error === 1) {
    drawBody(600, 300, 570, 360, '#0A3871');
  } if (error === 0) {
    drawBody(600, 300, 630, 360, '#0A3871');
    gameOver(error);
  }
}

function hangingStructureDrawing(x, y, x1, y1, line, color) {
  board.strokeStyle = color;
  board.lineWidth = line;
  board.lineCap = 'round';
  board.lineJoin = 'round';
  board.beginPath();
  board.moveTo(x, y);
  board.lineTo(x1, y1);
  board.stroke();
}

function forca(color) {
  hangingStructureDrawing(300, 550, 750, 550, 10, color);
  hangingStructureDrawing(400, 110, 470, 25, 10, color);
  hangingStructureDrawing(400, 550, 400, 25, 10, color);
  hangingStructureDrawing(400, 25, 600, 25, 10, color);
  hangingStructureDrawing(601, 25, 602, 155, 8, color);
}

cancelBtn.addEventListener('click', () => {
  startScreen.classList.remove('hidden');
  screenAddWords.classList.add('hidden');
  newWordInput.value = '';
});

/* função para inserir novas palavras no array */
saveWord.addEventListener('click', () => {
  const newWordValue = newWordInput.value;
  if (newWordValue !== '') {
    const novasPalavras = newWordValue.split(', ');
    for (let i = 0; i < novasPalavras.length; i += 1) {
      novasPalavras[i] = novasPalavras[i].toUpperCase();
      novasPalavras[i] = novasPalavras[i].normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    } /* adicionar popup sobre as letras maiusculas e não usar caracteres com acento e ç */

    for (let index = 0; index < novasPalavras.length; index += 1) {
      if (palavras.includes(novasPalavras[index])) {
        modalWin.classList.add('show');
        modal.classList.add('alert');
        newGameModalBtn.innerText = 'Alterar palavra';
        const repeatedWord = `A palavra "${novasPalavras[index]}" já está incluída no jogo`;
        titleModal.innerText = repeatedWord;
        startGame = false;
      } else {
        palavras.push(novasPalavras[index]);
        startGame = true;
      }
    }
    if (startGame === true) {
      screenAddWords.classList.add('hidden');
      gameScreen.classList.remove('hidden');
      newGame();
    }
  } else {
    /* criar popup informando que o campo não pode estar em branco */
    modalWin.classList.add('show');
    modal.classList.add('alert');
    newGameModalBtn.innerText = 'Adicionar palavra';
    const validWord = 'Por favor, insira uma palavra válida, ou pressione "Tela inicial" para retornar para tela principal.';
    titleModal.innerText = validWord;
    // alert('Favor inserir uma palavra, ou pressione cancelar, para retornar para tela principal');
  }
});

function writeCorrectLetter(index) {
  board.font = 'bold 52px Inter';
  board.lineWidth = 6;
  board.lineCap = 'round';
  board.lineJoin = 'round';
  board.strokeStyle = '#0A3871';
  const axis = 600 / secretWord.length;
  board.fillText(secretWord[index], 305 + (axis * index), 620);
  board.stroke();
}

function writeWrongLetter(wrongLetter, errorsLeft) {
  board.font = 'bold 40px Inter';
  board.lineWidth = 6;
  board.lineCap = 'round';
  board.lineJoin = 'round';
  board.strokeStyle = '#0A3871';
  board.fillText(wrongLetter, 335 + (40 * (10 - errorsLeft)), 710, 40);
  board.stroke();
}

function checkCorrectLetter(key) {
  if (letras.length < 1 || letras.indexOf(key) < 0) {
    letras.push(key);
    return false;
  } else {
    letras.push(key.toUpperCase());
    return true;
  }
}

function addCorrectLetter(i) {
  correctWord += secretWord[i].toUpperCase();
}

function addWrongLetter(letter) {
  if (secretWord.indexOf(letter) <= 0) {
    errors -= 1;
    drawFullBody(errors);
  }
}

function validaVitoria() {
  for (let i = 0; i < correctWordArr.length; i += 1) {
    if (secretLetterArr.includes(correctWordArr[i])) {
      vitoria = true;
    }
  }
}

function validaArr() {
  if (correctWordArr.length === secretLetterArr.length) {
    vitoriaArrOk = true;
  }
}

function winGame() {
  if (vitoria === true && vitoriaArrOk === true && startGame === true) {
    modalWin.classList.add('show');
    newGameModalBtn.innerText = 'Novo Jogo';
    const win = 'Parabéns, você venceu! ';
    titleModal.innerText = win + String.fromCodePoint(0X1F3C6);
  }
}

function isLetter(codigo) {
  return codigo >= 65 && codigo <= 90;
}

document.onkeydown = (e) => {
  const codigo = e.keyCode;
  if (isLetter(codigo)) {
    const letra = e.key.toUpperCase();
    if (!checkCorrectLetter(e.key)) {
      if (secretWord.includes(letra)) {
        addCorrectLetter(secretWord.indexOf(letra));
        for (let i = 0; i < secretWord.length; i += 1) {
          if (secretWord[i] === letra) {
            writeCorrectLetter(i);
            correctWordArr.push(letra);
          }
        } validaVitoria(); validaArr(); winGame();
      } else {
        if (!checkCorrectLetter(e.key)) return;
        addWrongLetter(letra);
        writeWrongLetter(letra, errors);
      }
    }
  }
};

function quitGame() {
  gameScreen.classList.add('hidden');
  startScreen.classList.remove('hidden');
  screenAddWords.classList.add('hidden');
  modalWin.classList.remove('show');
  board.clearRect(0, 0, 1200, 860);
}

/*  */
startGameBtn.onclick = newGame;
quitBtn.onclick = quitGame;
newGameBtn.onclick = newGame;
newWordBtn.onclick = newWordScreen;

/* Modal  */

newGameModalBtn.onclick = newGame;
exitModal.onclick = quitGame;
