document.addEventListener('DOMContentLoaded', () => {

    const iniciar = document.getElementById('iniciarJogo') //Selecionando o botão iniciar no HTML
    const areaTabuleiro = document.querySelector('.jogo') //Selecionando a área do tabuleiro no HTML
    const areaDeRegras = document.querySelector('.areaDeRegras')

    const tabuleiro = document.querySelector('.tabuleiro') //Selecionando o elemento do tabuleiro no HTML
    const Quadrados = []            //Array para armazenar os quadrados do tabuleiro
    const width = 10    
                //Largura do tabuleiro
    //Gerando o tabuleiro
    function criarTabuleiro(tabuleiro, quadrados) {
        console.log("Criando tabuleiro")
        areaTabuleiro.style.display = 'block' //Muda o valor do display para mostrar a área do tabuleiro
        areaDeRegras.style.display = 'none'  //Muda o valor do display para ocultar a área das regras

        for (let i = 0; i < width*width; i++) {
            const quad = document.createElement('div')  //Cria um quadrado
            quad.dataset.id = i                         //Atribui um id ao quadrado
            tabuleiro.appendChild(quad)                 //Adiciona o quadrado ao tabuleiro
            quadrados.push(quad)                        //Adiciona o quadrado ao array de quadrados
        }
    }

    iniciar.addEventListener('click', () => criarTabuleiro(tabuleiro, Quadrados)) //Adiciona um evento de click ao botão iniciar, que chama a função de criar o tabuleiro


})