const palavras = ['TOMATE', 'LARANJA', 'CARRO', 'BARCO', 'INTERNET'];
let letras = [];
let correctWordArr = [];
let secretLetterArr = [];
// let novasPalavras = [];

const startGameBtn = document.querySelector('#btn-start-game');
const startScreen = document.querySelector('#start-screen');
const newWordBtn = document.querySelector('#btn-new-word');
const screenAddWords = document.querySelector('#screen-add-words');
const cancelBtn = document.querySelector('#btn-cancel');
const saveWord = document.querySelector('#btn-save-word');
const gameScreen = document.querySelector('#game-screen');
const newGameBtn = document.querySelector('#btn-new-game');
const quitBtn = document.querySelector('#btn-quit');

let secretWord = '';
let correctWord = '';
let errors = 9;
let vitoria = false;
let vitoriaArrOk = false;

const board = document.getElementById('board').getContext('2d');

const newWordInput = document.querySelector('#new-word');

const startScreenClass = startScreen.className;
const wordScreenClass = screenAddWords.className;
// const gameScreenClass = gameScreen.className;

startGameBtn.addEventListener('click', () => {
  if (startScreenClass.indexOf('hidden') === -1) {
    startScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    letras = [];
    errors = 9;
    drawLine(randomWord());
  }
});

newWordBtn.addEventListener('click', () => {
  if (wordScreenClass.indexOf('hidden') !== -1) {
    startScreen.classList.add('hidden');
    screenAddWords.classList.remove('hidden');
  }
});

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

    let startGame = false;

    for (let index = 0; index < novasPalavras.length; index += 1) {
      if (palavras.includes(novasPalavras[index])) {
        alert(`A palavra ${novasPalavras[index]} já está incluída no jogo`);
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
      errors = 9;
      board.clearRect(0, 0, 1200, 860);
      drawLine(randomWord());
    }
    console.log(palavras);
  } else {
    /* criar popup informando que o campo não pode estar em branco */
    alert('Favor inserir uma palavra, ou pressione cancelar, para retornar para tela principal');
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

newGameBtn.addEventListener('click', () => {
  screenAddWords.classList.add('hidden');
  gameScreen.classList.remove('hidden');
  board.clearRect(0, 0, 1200, 860);
  letras = [];
  errors = 9;
  drawLine(randomWord());
});

quitBtn.addEventListener('click', () => {
  gameScreen.classList.add('hidden');
  startScreen.classList.remove('hidden');
  board.clearRect(0, 0, 1200, 860);
});

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
      console.log();
    }
  }
}

function validaArr() {
  if (correctWordArr.length === secretLetterArr.length) {
    vitoriaArrOk = true;
    console.log('você gahou');
    console.log(correctWordArr.length);
    console.log(secretLetterArr.length);
  } else {
    console.log('você perdeu!');
  }
}

function winGame() {
  if (vitoria === true && vitoriaArrOk === true) {
    console.log('Parabéns, você ganhou!');
  }
}
