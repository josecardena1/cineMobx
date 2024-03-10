$(document).ready(function() {
    const maxLevel = 20;
    let currentLevel = 1;
    let sequence = '';
    let timer;
    let userInputEnabled = false;
  
    $('button').eq(0).click(function() {
      $(this).hide();
      $('#instruction').show();
      $('.sequence-container').show();
      $('button:nth-of-type(2)').show();
      startRound();
    });
  
    function startRound() {
      sequence = generateSequence(currentLevel);
      displaySequence();
  
      setTimeout(function() {
        clearSequence();
        $('#user-input').show(); // Mostrar el input
        userInputEnabled = true;
        $('#instruction').text('Ingresa la secuencia:');
        timer = setTimeout(function() {
          userInputEnabled = false;
          $('#instruction').text('Se acabó el tiempo. Inténtalo de nuevo.');
          $('#result').text('Perdiste');
          $('button:last-of-type').show();
          $('#user-input').hide(); // Ocultar el input
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
      $('#sequence').text(sequence);
    }
  
    function clearSequence() {
      $('#sequence').text('');
    }
  
    $('#user-input').keypress(function(event) {
      if (event.key === 'Enter') {
        checkSequence();
        $('button:nth-of-type(3)').hide(); // Ocultar el botón de verificar
      }
    });
  
    function checkSequence() {
      if (!userInputEnabled) return;
  
      clearTimeout(timer);
      userInputEnabled = false;
  
      const userInput = $('#user-input').val();
      if (userInput === sequence) {
        $('#result').text('¡Correcto!');
        $('#user-input').val(''); // Limpiar el input
        $('button:nth-of-type(3)').show();
      } else {
        $('#result').text('¡Incorrecto! Intenta nuevamente.');
        $('button:last-of-type').show(); // Mostrar el botón "Jugar de nuevo"
        $('button:nth-last-of-type(2)').hide();
      }
    }
  
    $('button:nth-of-type(3)').click(function() {
      currentLevel++;
      $('button:nth-of-type(3)').hide();
      $('#user-input').hide(); // Ocultar el input
      startRound();
    });
  
    $('button:last-of-type').click(function() {
      currentLevel = 1;
      $('button:last-of-type').hide();
      startRound();
    });
  });
  