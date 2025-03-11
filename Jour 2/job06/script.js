// Séquence du code Konami
const konamiCode = [
    'ArrowUp', 'ArrowDown',
    'ArrowLeft',  'ArrowRight',
    'ArrowUp', 'ArrowDown',
    'ArrowLeft',  'ArrowRight',
];

let userInput = [];


function checkKonamiCode(event) {
  
    userInput.push(event.key);

 
    if (userInput.length > konamiCode.length) {
        userInput.shift(); 
    }

    if (userInput.toString() === konamiCode.toString()) {
      
        document.body.classList.add('konami');

        document.getElementById('content').innerHTML = '<h1>TU ES RICHE GG!</h1>';

       
        window.removeEventListener('keydown', checkKonamiCode);
    }
}

window.addEventListener('keydown', checkKonamiCode);

// Haut (↑)
// Bas (↓)
// Gauche (←)
// Droite (→)
