const panda = document.querySelector('.panda');
const pipe = document.querySelector('.pipe');
let gameRunning = false;
let loop;
let score = 0;

const jump = () => {
    if (gameRunning) {
        panda.classList.add('jump');

        setTimeout(() => {
            panda.classList.remove('jump');
             checkJumpSuccess();
        }, 500);
        updateScore();
    }
}

const updateScore = () => {
    if (gameRunning) {
        score++;
        document.getElementById('score').textContent = `Pontuação: ${score}`;

        if (score === 20) {
            showVictoryMessage();
        }
    }
}

const returnToMenu = () => {
    const menu = document.getElementById('menu');
    const game = document.getElementById('game');
    const victoryMessage = document.getElementById('victory-message');

    menu.style.display = 'block';
    game.style.display = 'none';
    victoryMessage.style.display = 'none';

    // Limpar qualquer intervalo existente
    clearInterval(loop);

    // Reiniciar o loop e eventos
    startGame();
}

const startGame = () => {
    const menu = document.getElementById('menu');
    const game = document.getElementById('game');

    menu.style.display = 'none';
    game.style.display = 'block';

    score = 0;
    document.getElementById('score').textContent = 'Pontuação: 0';

    gameRunning = true;

    loop = setInterval(() => {

    console.log('loop')

    const pipePosition = pipe.offsetLeft;
    const pandaPosition = +window.getComputedStyle(panda).bottom.replace('px', '');

    console.log(pandaPosition);

    if(pipePosition <= 120 && pipePosition > 0  && pandaPosition < 80) {

        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        panda.style.animation = 'none';
        panda.style.bottom = `${pandaPosition}px`;

        panda.src = 'game-over.png';
        panda.style.window = '75px'
        panda.style.marginLeft = '50px'

        clearInterval(loop);
    }

}, 10);

document.addEventListener('keydown', jump);
}

const showVictoryMessage = () => {
    const victoryMessage = document.getElementById('victory-message');
    victoryMessage.style.display = 'block';

    document.removeEventListener('keydown', jump);
    gameRunning = false;
}

const showCredits = () => {
    const menu = document.getElementById('menu');
    const credits = document.getElementById('credits');

    menu.style.display = 'none';
    credits.style.display = 'block';

    document.removeEventListener('keydown', jump);
    gameRunning = false;
}

document.addEventListener('keydown', (event) => {
    if (gameRunning && event.key === ' ') {
        jump();
    }
});

const restartGame = () => {
    const menu = document.getElementById('menu');
    const game = document.getElementById('game');
    const victoryMessage = document.getElementById('victory-message');

    menu.style.display = 'block';
    game.style.display = 'none';
    credits.style.display = 'none';

    clearInterval(loop);

    startGame();
}