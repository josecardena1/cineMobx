const maxLevel = 20;
let currentLevel = 1;
let sequence = '';
let timer;
let userInputEnabled = false;

function startGame() {
  document.querySelector('button').style.display = 'none';
  document.getElementById('instruction').style.display = 'block';
  document.querySelector('.sequence-container').style.display = 'block';
  document.querySelector('button:nth-of-type(2)').style.display = 'block';
  startRound();
}

function startRound() {
  sequence = generateSequence(currentLevel);
  displaySequence();
  
  setTimeout(function() {
    clearSequence();
    document.getElementById('user-input').style.display = 'block'; // Mostrar el input
    userInputEnabled = true;
    document.getElementById('instruction').innerText = 'Ingresa la secuencia:';
    timer = setTimeout(function() {
      userInputEnabled = false;
      document.getElementById('instruction').innerText = 'Se acabó el tiempo. Inténtalo de nuevo.';
      document.getElementById('result').innerText = 'Perdiste';
      document.querySelector('button:last-of-type').style.display = 'block';
      document.getElementById('user-input').style.display = 'none'; // Ocultar el input
    }, 5000); // Cambiar el valor 5000 a la duración deseada en milisegundos (en este caso, 5 segundos)
  }, 5000); // Cambiar el valor 5000 a la duración deseada en milisegundos (en este caso, 5 segundos)
}

function generateSequence(length) {
  let sequence = '';
  for (let i = 0; i < length; i++) {
    sequence += Math.floor(Math.random() * 10);
  }
  return sequence;
}

function displaySequence() {
  document.getElementById('sequence').innerText = sequence;
}

function clearSequence() {
  document.getElementById('sequence').innerText = '';
}

function checkEnter(event) {
  if (event.key === 'Enter') {
    checkSequence();
  }
}

function checkSequence() {
  if (!userInputEnabled) return;
  
  clearTimeout(timer);
  userInputEnabled = false;
  
  const userInput = document.getElementById('user-input').value;
  if (userInput === sequence) {
    document.getElementById('result').innerText = '¡Correcto!';
    document.getElementById('user-input').value = ''; // Limpiar el input
    document.querySelector('button:nth-of-type(3)').style.display = 'block';
  } else {
    document.getElementById('result').innerText = '¡Incorrecto! Intenta nuevamente.';
    document.querySelector('button:last-of-type').style.display = 'block'; // Mostrar el botón "Jugar de nuevo"
    document.querySelector('button:nth-last-of-type(2)').style.display = 'none';
  }
}

function nextRound() {
  currentLevel++;
  document.querySelector('button:nth-of-type(3)').style.display = 'none';
  document.getElementById('user-input').style.display = 'none'; // Ocultar el input
  startRound();
}

function restartGame() {
  currentLevel = 1;
  document.querySelector('button:last-of-type').style.display = 'none';
  startRound();
}
