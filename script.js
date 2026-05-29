let current = 0;
let score = 0;

const questions = [
  { 
    q: "¿Qué significa realmente Atención Personalizada en ML Importaciones?", 
    o: ["Que te atienden rápido", "Que te recomiendan según tu estilo y objetivo", "Que tienen muchos productos", "Que te cobran más"], 
    c: 1 
  },
  { 
    q: "¿Cuánto puede durar aproximadamente un buen perfume árabe?", 
    o: ["2-3 horas", "8 a 14 horas", "24 horas exactas", "Solo 5 horas"], 
    c: 1 
  },
  { 
    q: "Tener más de un perfume es recomendable porque...", 
    o: ["Es gastar de más", "Te permite oler diferente según la ocasión", "Es una moda innecesaria", "No hace diferencia"], 
    c: 1 
  },
  { 
    q: "La mayor ventaja de comprar zapatillas originales es...", 
    o: ["Que se ven más bonitas", "La calidad, comodidad y durabilidad real", "El precio más bajo", "Que son más fáciles de limpiar"], 
    c: 1 
  },
  { 
    q: "Invertir en productos premium (perfume o zapatillas) representa principalmente...", 
    o: ["Vanidad", "Autoestima y proyección personal", "Seguir la moda", "Impresionar a los demás"], 
    c: 1 
  }
];

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function startRules() {
  showScreen('rules');
}

function startGame() {
  current = 0;
  score = 0;
  showScreen('game');
  loadQuestion();
}

function loadQuestion() {
  const q = questions[current];
  document.getElementById('qnum').textContent = current + 1;
  document.getElementById('question').innerHTML = `<strong>${q.q}</strong>`;

  const div = document.getElementById('options');
  div.innerHTML = '';

  q.o.forEach((option, i) => {
    const btn = document.createElement('div');
    btn.className = 'option';
    btn.textContent = option;
    btn.onclick = () => selectAnswer(i, btn);
    div.appendChild(btn);
  });
}

function selectAnswer(selectedIndex, selectedBtn) {
  const q = questions[current];
  const allOptions = document.querySelectorAll('.option');

  // Desactivar todos los botones
  allOptions.forEach(btn => btn.style.pointerEvents = 'none');

  // Marcar correcto e incorrecto
  allOptions.forEach((btn, index) => {
    if (index === q.c) {
      btn.style.borderColor = '#22c55e';
      btn.style.backgroundColor = 'rgba(34, 197, 94, 0.2)';
    }
    if (index === selectedIndex && index !== q.c) {
      btn.style.borderColor = '#ef4444';
      btn.style.backgroundColor = 'rgba(239, 68, 68, 0.2)';
    }
  });

  if (selectedIndex === q.c) {
    score++;
  }

  // Esperar un poco y pasar a la siguiente
  setTimeout(() => {
    current++;
    if (current < questions.length) {
      loadQuestion();
    } else {
      finishGame();
    }
  }, 1600);
}

function finishGame() {
  if (score === 5) {
    const code = "ML10-" + Math.floor(100000 + Math.random() * 900000);
    const text = `¡Ganaste el Perfumito Challenge! 🎉\n\nMi código es: ${code}\nQuiero reclamar mi 10% OFF en ML Importaciones.`;

    if (confirm(`🎉 ¡FELICITACIONES! 5/5 correctas\n\nTu código: ${code}\n\n¿Abrir WhatsApp para reclamarlo?`)) {
      window.location.href = `https://wa.me/5491167911329?text=${encodeURIComponent(text)}`;
    } else {
      alert("Tu código es: " + code + "\nGuárdalo y avísame por WhatsApp.");
    }
  } else {
    alert(`Terminaste con ${score}/5 correctas.\n¡Volvé a intentarlo para ganar el 10% OFF!`);
    showScreen('welcome');
  }
}