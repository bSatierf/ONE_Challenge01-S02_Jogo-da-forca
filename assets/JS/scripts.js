const palavras = ['TOMATE', 'LARANJA', 'CARRO', 'BARCO', 'INTERNET'];
let novasPalavras = [];

const newGameBtn = document.querySelector('#btn-new-game');
const startScreen = document.querySelector('.start-screen');
const newWordBtn = document.querySelector('.btn-new-word');
const screenAddWords = document.querySelector('.screen-add-words');

const startScreenClass = startScreen.className;
const wordScreenClass = screenAddWords.className;

newGameBtn.addEventListener('click', () => {
  if (startScreenClass.indexOf('hidden') === -1) {
    startScreen.classList.add('hidden');
  }
});

function newWordScreen() {
  if (wordScreenClass.indexOf('hidden') !== -1) {
    startScreen.classList.add('hidden');
    screenAddWords.classList.remove('hidden');
  }
}
