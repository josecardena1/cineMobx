const cells = document.querySelectorAll('.cell');
let sequence = [];
let currentLevel = 1;
let currentIndex = 0;
let userSequence = [];

function generateSequence() {
  sequence = [];
  for (let i = 0; i < currentLevel; i++) {
    sequence.push(Math.floor(Math.random() * cells.length));
  }
}

function animateSequence() {
  for (let i = 0; i < sequence.length; i++) {
    setTimeout(() => {
      const cellIndex = sequence[i];
      cells[cellIndex].style.backgroundColor = 'blue';
      setTimeout(() => {
        cells[cellIndex].style.backgroundColor = '';
      }, 500); // 500 milliseconds, adjust as needed
    }, i * 1000); // 1000 milliseconds delay between each cell, adjust as needed
  }
}

function checkCell(index) {
  if (currentIndex < sequence.length) {
    userSequence.push(index);
    if (userSequence.length === sequence.length) {
      checkSequence();
    }
    cells[index].style.backgroundColor = sequence[currentIndex] === index ? 'blue' : 'red';
    setTimeout(() => {
      cells[index].style.backgroundColor = '';
    }, 500); // 500 milliseconds, adjust as needed
    currentIndex++;
  }
}

function checkSequence() {
  for (let i = 0; i < userSequence.length; i++) {
    if (userSequence[i] !== sequence[i]) {
      // Si el usuario hace clic en una celda incorrecta, reiniciar el juego
      alert('¡Incorrecto! Has perdido.');
      currentLevel = 1;
      currentIndex = 0;
      generateSequence();
      animateSequence();
      userSequence = [];
      return;
    }
  }
  // Si el usuario completa la secuencia correctamente, pasar al siguiente nivel
  currentIndex = 0;
  currentLevel++;
  generateSequence();
  animateSequence();
  userSequence = [];
}

// Inicializar el juego
generateSequence();
animateSequence();
