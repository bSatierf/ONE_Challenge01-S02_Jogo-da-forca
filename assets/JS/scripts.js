const palavras = ['TOMATE', 'LARANJA', 'CARRO', 'BARCO', 'INTERNET'];
let letras = [];
let correctWordArr = [];
let secretLetterArr = [];
// let novasPalavras = [];

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

let secretWord = '';
let correctWord = '';
let errors = 6;
let vitoria = false;
let vitoriaArrOk = false;
let startGame = false;

const board = document.getElementById('board').getContext('2d');

const newWordInput = document.querySelector('#new-word');

const startScreenClass = startScreen.className;
const wordScreenClass = screenAddWords.className;
// const gameScreenClass = gameScreen.className;

// startGameBtn.addEventListener('click', () => {});

function newGame() {
  if (startScreenClass.indexOf('hidden') === -1) {
    startScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    letras = [];
    errors = 6;
    modalWin.classList.remove('show');
    board.clearRect(0, 0, 1200, 860);
    drawLine(randomWord());
    vitoria = false;
    vitoriaArrOk = false;
    startGame = true;
    console.log('teste');
  }
}

startGameBtn.onclick = newGame;

function newWordScreen() {
// newWordBtn.addEventListener('click', () => {
  if (wordScreenClass.indexOf('hidden') !== -1) {
    startScreen.classList.add('hidden');
    screenAddWords.classList.remove('hidden');
    startGame = false;
  }
}

newWordBtn.onclick = newWordScreen;

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
    console.log(novasPalavras);
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
      console.log(letras);
      newWordInput.value = '';
      letras = [];
      errors = 6;
      board.clearRect(0, 0, 1200, 860);
      drawLine(randomWord());
    }
    console.log(palavras);
  } else {
    /* criar popup informando que o campo não pode estar em branco */
    modalWin.classList.add('show');
    modal.classList.add('alert');
    newGameModalBtn.innerText = 'Adicionar palavra';
    const validWord = 'Por favor, insira uma palavra valida, ou pressione "Tela inicial" para retornar para tela principal.';
    titleModal.innerText = validWord; /* + String.fromCodePoint(0X1F3C6); */
    // alert('Favor inserir uma palavra, ou pressione cancelar, para retornar para tela principal');
  }
});

/* função desenhar jogo */

function randomWord() {
  correctWordArr = [];
  secretLetterArr = [];
  const chosenWord = palavras[Math.floor(Math.random() * palavras.length)];
  // console.log(chosenWord);
  secretWord = chosenWord;
  splitSecretWord();
  console.log(splitSecretWord());
  return chosenWord;
}

// console.log(secretWord);

function drawLine() {
  board.lineWidth = 6;
  board.lineCap = 'round';
  board.lineJoin = 'round';
  board.strokeStyle = '#0A3871';
  board.beginPath();

  const axis = 600 / secretWord.length;
  console.log(secretWord.length);
  for (let i = 0; i < secretWord.length; i += 1) {
    board.moveTo(300 + (axis * i), 640);
    board.lineTo(350 + (axis * i), 640);
  }
  board.stroke();
  board.closePath();
  console.log(secretWord);
}

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
}

function checkCorrectLetter(key) {
  if (letras.length < 1 || letras.indexOf(key) < 0) {
    console.log(key);
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

document.onkeydown = (e) => {
  const letra = e.key.toUpperCase();
  if (!checkCorrectLetter(e.key)) {
    if (secretWord.includes(letra)) {
      addCorrectLetter(secretWord.indexOf(letra));
      for (let i = 0; i < secretWord.length; i += 1) {
        if (secretWord[i] === letra) {
          writeCorrectLetter(i);
          correctWordArr.push(letra);
          console.log(correctWordArr);
        }
      } validaVitoria(); validaArr(); winGame();
    } else {
      if (!checkCorrectLetter(e.key)) return;
      addWrongLetter(letra);
      writeWrongLetter(letra, errors);
      console.log('erros' + errors);
    }
  }
};

// newGameBtn.addEventListener('click', () => {
//   screenAddWords.classList.add('hidden');
//   gameScreen.classList.remove('hidden');
//   board.clearRect(0, 0, 1200, 860);
//   letras = [];
//   errors = 9;
//   drawLine(randomWord());
// });

function quitGame() {
  gameScreen.classList.add('hidden');
  startScreen.classList.remove('hidden');
  screenAddWords.classList.add('hidden');
  modalWin.classList.remove('show');
  board.clearRect(0, 0, 1200, 860);
}

function splitSecretWord() {
  secretLetterArr = secretWord.split('');
  for (let i = 0; i < letras.length; i += 1) {
    secretLetterArr.push([i]);
  }
  return secretLetterArr;
}

function validaVitoria() {
  for (let i = 0; i < correctWordArr.length; i += 1) {
    if (secretLetterArr.includes(correctWordArr[i])) {
      vitoria = true;
      // console.log();
    }
  }
}

function validaArr() {
  if (correctWordArr.length === secretLetterArr.length) {
    vitoriaArrOk = true;
    // console.log('você gahou');
    // console.log(correctWordArr.length);
    // console.log(secretLetterArr.length);
  } else {
    // console.log('você perdeu!');
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

function gameOver(error) {
  if (error === 0) {
    const lose = 'Você perdeu! ';
    titleModal.textContent = lose + String.fromCodePoint(0X1F494);
    modalWin.classList.add('show');
  }
}

function drawHead(x, y, radius, color) {
  board.lineWidth = 6;
  board.lineCap = 'round';
  board.lineJoin = 'round';
  board.fillStyle = color;
  board.beginPath();
  board.arc(x, y, radius, 0, 2 * Math.PI);
  board.stroke();
}

function drawBody(x, y, x1, y1, color) {
  board.lineWidth = 6;
  board.lineCap = 'round';
  board.lineJoin = 'round';
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
    drawBody(600, 240, 600, 390);
  } if (error === 3) {
    drawBody(600, 390, 570, 470);
  } if (error === 2) {
    drawBody(600, 390, 630, 470);
  } if (error === 1) {
    drawBody(600, 300, 570, 360);
  } if (error === 0) {
    drawBody(600, 300, 630, 360);
    gameOver(error);
  }
}

/*  */

quitBtn.onclick = quitGame;
newGameBtn.onclick = newGame;

/* Modal  */

newGameModalBtn.onclick = newGame;
exitModal.onclick = quitGame;
