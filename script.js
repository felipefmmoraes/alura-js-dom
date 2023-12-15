const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const startPauseBt = document.querySelector('#start-pause');
const musicaFocoInput = document.querySelector('#alternar-musica');
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const imgPlayPause = document.querySelector('img.app__card-primary-butto-icon');
const tempoNaTela = document.querySelector('div#timer');

const musica = new Audio('/sons/luna-rise-part-one.mp3');
const somPlay = new Audio('/sons/play.wav');
const somPause = new Audio('/sons/pause.mp3');
const somBeep = new Audio('/sons/beep.mp3');

let tempoDecorridoEmSegundos = 1500;
let intervaloId;

musica.loop = true;

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused){
        musica.play();
    }else{
        musica.pause();
    }
})

focoBt.addEventListener('click', () => {
    alterarContexto('foco');
    focoBt.classList.add('active');
    zerar();
    tempoDecorridoEmSegundos = (0.1 * 60);
    mostrarTempo(); 
})

curtoBt.addEventListener('click', () => {
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
    zerar();
    tempoDecorridoEmSegundos = (5 * 60);
    mostrarTempo(); 
})

longoBt.addEventListener('click', () => {
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
    zerar();
    tempoDecorridoEmSegundos = (15 * 60);
    mostrarTempo(); 
})

function alterarContexto(contexto){
    botoes.forEach(function (contexto){
        contexto.classList.remove('active');
    })
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);
    switch (contexto){
        case "foco":
            titulo.innerHTML = 'Otimize sua produtividade, <br><strong class="app__title-strong">mergulhe no que importa.</strong>';

            break;

        case "descanso-curto":
            titulo.innerHTML = 'Que tal dar uma respirada? <br><strong class="app__title-strong">Faça uma pausa curta!</strong>';

            break;

        case "descanso-longo":
            titulo.innerHTML = 'Hora de voltar à superfície. <br><strong class="app__title-strong">Faça uma pausa longa.</strong>';

            break;

    default:
        break;

    }
}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        somBeep.play();
        alert('Tempo Finalizado!');
        const focoAtivo = html.getAttribute('data-contexto') == 'foco';
        if (focoAtivo) {
            const evento = new CustomEvent('FocoFinalizado');
            document.dispatchEvent(evento);
        }
        zerar();
        return;
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();    
}

startPauseBt.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar(){
    if(intervaloId){
        somPause.play();
        //imgPlayPause.setAttribute('src', '/imagens/play_arrow.png')
        //iniciarOuPausarBt.textContent = "Começar";
        zerar();
        return;
    }else{
        somPlay.play();
        imgPlayPause.setAttribute('src', '/imagens/pause.png')
        iniciarOuPausarBt.textContent = "Pausar";
    }
    intervaloId = setInterval(contagemRegressiva, 1000);
}

function zerar(){
    clearInterval(intervaloId);
    intervaloId = null;
    imgPlayPause.setAttribute('src', '/imagens/play_arrow.png')
    iniciarOuPausarBt.textContent = "Começar";
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'});
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();