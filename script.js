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

    // Definindo os navios
    const navios = [
        {nome: 'porta-avioes', tamanho: 5},
        {nome: 'navio-tanque', tamanho: 4},
        {nome: 'destrutor', tamanho: 3},
        {nome: 'fragata', tamanho: 3},
        {nome: 'submarino', tamanho: 2}
    ];

    //Gerando um número aleatório para
    function numeroAleatorio(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    //Verificando se o navio pode ser colocado na posição selecionada
    function verificarPosicao(tabuleiro, navio, x, y, horizontal) {
        const tamanhoNavio = navio.tamanho;
        
        // Verifica se a posição está dentro dos limites do tabuleiro
        if (horizontal) {
            if (x + tamanhoNavio > width) return false; //Retorna falso se exceder o limite horizontal
            for (let i = 0; i < tamanhoNavio; i++) {
                if (tabuleiro[y * width + x + i].classList.contains('ocupado')) {
                    return false; //Retorna falso se a posição já estiver ocupada
                }
            }
        }else {
            if (y + tamanhoNavio > width) return false; //Retorna falso se exceder o limite vertical
            for (let i = 0; i < tamanhoNavio; i++) {
                if (tabuleiro[(y + i) * width + x].classList.contains('ocupado')) {
                    return false; //Retorna falso se a posição já estiver ocupada
                }
            }
        }    
        return true;
    }

    //Gerando o navio e colocando no tabuleiro
    function colocarNavio(tabuleiro, navio) {
        let posicaoValida = false;
        let x, y, horizontal;

        while (!posicaoValida) {            
            horizontal = Math.random() < 0.5; //Escolhendo a posição do navio

            //Gera as coordenadas iniciais x e y
            x = numeroAleatorio(0, width - 1);
            y = numeroAleatorio(0, width - 1);            
            posicaoValida = verificarPosicao(tabuleiro, navio, x, y, horizontal); //Verifica se a coordenada é valida
        }
        //Colocando o navio no tabuleiro
        for (let i = 0; i < navio.tamanho; i++) {
            let idQuadrado;
            if (horizontal) {
                idQuadrado = y * width + (x + i); //Calcula a posição horizontal
                tabuleiro[idQuadrado].classList.add('ocupado');
                tabuleiro[idQuadrado].dataset.navio = `${navio.nome}-parte-${i + 1}`;
            } else {
                idQuadrado = (y + i) * width + x; //Calcula a posição vertical
                tabuleiro[idQuadrado].classList.add('ocupado');
                tabuleiro[idQuadrado].dataset.navio = `${navio.nome}-parte-${i + 1}`;   //Adiciona ao id o nome e a parte do navio
            }
        }
    }

    //Gerando o tabuleiro completo
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
                console.log("Clicado em agua")
                somClique.currentTime = 0;
                somClique.play();
            });
        }
        // Coloca os navios no tabuleiro de forma aleatória
        navios.forEach(navio => {
        colocarNavio(quadrados, navio);
        });
    }

    //Adiciona um evento de click ao botão iniciar, que chama a função de criar o tabuleiro
    iniciar.addEventListener('click', () => criarTabuleiro(tabuleiro, Quadrados)) 

})
