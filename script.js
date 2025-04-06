document.addEventListener('DOMContentLoaded', () => {

    //upload dos audios
    const somFundo = new Audio('audio/aguadefundo.mp3');
    somFundo.loop = true;

    const somClique = new Audio('audio/Clique-agua.mp3');
    const somBomba = new Audio('audio/Explosao-bomba.mp3');
    const somAfundado = new Audio('audio/Emersao-barco.mp3');
    const somVitoria = new Audio('audio/Vitoria-tadaa.mp3');
    const somDerrota = new Audio('audio/Derrota-explosaototal.mp3');

    //volume dos audios
    somFundo.volume = 0.4;
    somClique.volume = 0.6;
    somBomba.volume = 0.8;
    somAfundado.volume = 1.0;
    somVitoria.volume = 1.0;
    somDerrota.volume = 1.0;

    const iniciar = document.getElementById('iniciarJogo')
    const areaTabuleiro = document.querySelector('.jogo') 
    const areaDeRegras = document.querySelector('.areaDeRegras')

    const tabuleiro = document.querySelector('.tabuleiro') 
    const Quadrados = [] //Array para armazenar os quadrados do tabuleiro
    const width = 10    //Largura do tabuleiro

    //Gerando o tabuleiro
    function criarTabuleiro(tabuleiro, quadrados) {
    
        console.log("Criando tabuleiro")
        areaTabuleiro.style.display = 'block' //Muda o display para mostrar a área do tabuleiro
        areaDeRegras.style.display = 'none'  //Muda o display para ocultar a área das regras
        
        //som de fundo agua
        somFundo.currentTime = 0;
        somFundo.play();

        for (let i = 0; i < width * width; i++) {
            const quad = document.createElement('div')  //Cria um quadrado
            quad.dataset.id = i                         //Atribui um id ao quadrado
            tabuleiro.appendChild(quad)                 //Adiciona o quadrado ao tabuleiro
            quadrados.push(quad)                        //Adiciona o quadrado ao array de quadrados

        //som de clique quadrado sem nada
        quad.addEventListener('click', () => {
            console.log("Clique em agua")
            somClique.currentTime = 0;
            somClique.play();
        });
        }
    }

    iniciar.addEventListener('click', () => criarTabuleiro(tabuleiro, Quadrados)) //Adiciona um evento de click ao botão iniciar, que chama a função de criar o tabuleiro


})
