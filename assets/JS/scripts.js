const palavras = ['TOMATE', 'LARANJA', 'CARRO', 'BARCO', 'INTERNET'];
// let novasPalavras = [];

const newGameBtn = document.querySelector('#btn-new-game');
const startScreen = document.querySelector('#start-screen');
const newWordBtn = document.querySelector('#btn-new-word');
const screenAddWords = document.querySelector('#screen-add-words');
const cancelBtn = document.querySelector('#btn-cancel');
const saveWord = document.querySelector('#btn-save-word');
const gameScreen = document.querySelector('#game-screen');

const newWordInput = document.querySelector('#new-word');

const startScreenClass = startScreen.className;
const wordScreenClass = screenAddWords.className;
const gameScreenClass = gameScreen.className;

newGameBtn.addEventListener('click', () => {
  if (startScreenClass.indexOf('hidden') === -1) {
    startScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
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
    for (let index = 0; index < novasPalavras.length; index += 1) {
      if (palavras.includes(novasPalavras[index])) {
        alert(`A palavra ${novasPalavras[index]} já está incluída no jogo`);
      } else {
        palavras.push(novasPalavras[index]);
        screenAddWords.classList.add('hidden');
        gameScreen.classList.remove('hidden');
      }
    }
    console.log(palavras);
  } else { /* criar popup informando que o campo não pode estar em branco */
    alert('Favor inserir uma palavra, ou pressione cancelar, para retornar para tela principal');
  }
});

/* função desenhar jogo */
