const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const pipe2 = document.querySelector('.pipe2');
const botaoFinal = document.querySelector('#botaoFinal');
const fim = document.querySelector('.perdeu');
const game = document.querySelector('.jogo');
const txtPontos = document.querySelector('.pontos');
const txtFase = document.querySelector('.fase');
const txtPontosFinais = document.querySelector('.pontos-finais');

let score = 0;
let colidiu = false;

const somarPontos = setInterval(() => {
    if (!colidiu) {
        while (score < 130) {
            score++;
            txtPontos.innerText = `Pontos: ${score}`;
            verificarMudancaFase();
        }
    }
}, 100);

//BOTAO DE CHEGADAAAAAAA

let pipeTerminou = false;
let pipe2Terminou = false;

pipe.addEventListener('animationend', () => {
    pipeTerminou = true;

    if (pipeTerminou && pipe2Terminou) {
        mostrarBotao();
    }
});
pipe2.addEventListener('animationend', () => {
    pipe2Terminou = true;

    if (pipeTerminou && pipe2Terminou) {
        mostrarBotao();
    }
});
function mostrarBotao() {
    botaoFinal.style.display = 'block';
    botaoFinal.style.animation = 'botao-animation 2s linear forwards';
    document.querySelector('.final').style.display = 'flex';
}

function irParaFase2() {
    window.location.href = "fase3.html";
}

//PULO
const jump = () => {
    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
};


//SAPOS

const loop = setInterval(() => {

    const pipePosition = pipe.offsetLeft;
    const pipe2Position = pipe2.offsetLeft;

    const marioPosition = +window
        .getComputedStyle(mario)
        .bottom
        .replace('px', '');

    if (
        (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) ||
        (pipe2Position <= 120 && pipe2Position > 0 && marioPosition < 80)
    ) {

        pipe.style.animation = 'none';
        pipe2.style.animation = 'none';

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = 'img/pedra.png';
        mario.style.width = '150px';
        mario.style.marginLeft = '50px';

        // Alterna exibições de tela
        fim.style.display = 'flex';
        inimigo.style.display = 'none';
        persona.style.display = 'none';
        txtPontos.style.display = 'none';
        txtFase.style.display = 'none';

        colidiu = true;

        clearInterval(loop);
        clearInterval(somarPontos);
    }

}, 5);


//TECLA DE PULAR
document.addEventListener('keydown', (event) => {

    if (event.code === 'Space' || event.code === 'ArrowUp') {
        jump();
    }

});