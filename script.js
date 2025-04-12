document.addEventListener('DOMContentLoaded', () => {

    //upload dos audios
    const somFundo = new Audio('audio/aguadefundo.mp3')
    somFundo.loop = true

    const somClique = new Audio('audio/Clique-agua.mp3')
    const somBomba = new Audio('audio/Explosao-bomba.mp3')
    const somAfundado = new Audio('audio/Emersao-barco.mp3')
    const somVitoria = new Audio('audio/Vitoria-tadaa.mp3')
    const somDerrota = new Audio('audio/Derrota-explosaototal.mp3')

    //volume dos audios
    somFundo.volume = 0.4
    somClique.volume = 0.6
    somBomba.volume = 0.8
    somAfundado.volume = 1.0
    somVitoria.volume = 1.0
    somDerrota.volume = 1.0

    const iniciar = document.getElementById('iniciarJogo')
    const areaTabuleiro = document.querySelector('.jogo') 
    const areaDeRegras = document.querySelector('.areaDeRegras')
    const tabuleiro = document.querySelector('.tabuleiro') 
    const Quadrados = [] //Array para armazenar os quadrados do tabuleiro
    const width = 10    //Largura do tabuleiro

    const totalBombas = Math.floor(width * width * 0.07) //Total de bombas será de 7% do tabuleiro
    let quantVidas = 5    //Quantidade de vidas iniciais

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
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    //Verificando se o navio pode ser colocado na posição selecionada
    function verificarPosicao(tabuleiro, navio, x, y, horizontal) {
        const tamanhoNavio = navio.tamanho
        
        // Verifica se a posição está dentro dos limites do tabuleiro
        if (horizontal) {
            if (x + tamanhoNavio > width) return false; //Retorna falso se exceder o limite horizontal
            for (let i = 0; i < tamanhoNavio; i++) {
                if (tabuleiro[y * width + x + i].classList.contains('ocupado')) {
                    return false //Retorna falso se a posição já estiver ocupada
                }
            }
        }else {
            if (y + tamanhoNavio > width) return false; //Retorna falso se exceder o limite vertical
            for (let i = 0; i < tamanhoNavio; i++) {
                if (tabuleiro[(y + i) * width + x].classList.contains('ocupado')) {
                    return false //Retorna falso se a posição já estiver ocupada
                }
            }
        }    
        return true
    }

    //Gerando o navio e colocando no tabuleiro
    function colocarNavio(tabuleiro, navio) {
        let posicaoValida = false
        let x, y, horizontal

        while (!posicaoValida) {            
            horizontal = Math.random() < 0.5 //Escolhendo a posição do navio

            //Gera as coordenadas iniciais x e y
            x = numeroAleatorio(0, width - 1)
            y = numeroAleatorio(0, width - 1)           
            posicaoValida = verificarPosicao(tabuleiro, navio, x, y, horizontal) //Verifica se a coordenada é valida
        }
        //Colocando o navio no tabuleiro
        for (let i = 0; i < navio.tamanho; i++) {
            let idQuadrado
            if (horizontal) {
                idQuadrado = y * width + (x + i) //Calcula a posição horizontal
                tabuleiro[idQuadrado].classList.add('ocupado')
                tabuleiro[idQuadrado].dataset.navio = `${navio.nome}-parte-${i + 1}`
            } else {
                idQuadrado = (y + i) * width + x //Calcula a posição vertical
                tabuleiro[idQuadrado].classList.add('ocupado')
                tabuleiro[idQuadrado].dataset.navio = `${navio.nome}-parte-${i + 1}`   //Adiciona ao id o nome e a parte do navio
            }
        }
    }

    //Atualizando os corações de vida
    function atualizarVidas(quantVidaAtual){
        const coracoes = document.querySelectorAll('#vidas .vida')

        coracoes.forEach((coracoes, num) => {
            if(num >= quantVidaAtual){
                coracoes.classList.add('perdida')
            }else{
                coracoes.classList.remove('perdida')
            }
        })
    }

    //Gerando as bombas
    function geraBombas(quadrados, quantidade){
        const bombas = new Set()
        while(bombas.size < quantidade){
            const num = numeroAleatorio(0, width * width - 1)
            if(podeBomba(num, bombas, quadrados)){
                bombas.add(num)
                quadrados[num].classList.add('bomba')
                quadrados[num].dataset.tipo = 'bomba'
            }
        }
    }

    //Verificando se tem bomba nos arredores
    function podeBomba(num, bombas, quadrados){
        const x = num % width   //Coluna
        const y = Math.floor(num / width)   //Linha

        //Evita que uma bomba seja colocada em cima de um navio
        if(quadrados[num].classList.contains('ocupado')){
            return false
        }

        //Entenda, estamos verificando os quadradinhos (células) em volta do quadrado que foi selecionado para ter a bomba, NÃO PODEMOS colocar uma bomba ao lado de outra

        for(let celulaY = -1; celulaY <= 1; celulaY++){
            for(let celulaX = -1; celulaX <= 1; celulaX++){
                 
                if(celulaX === 0 && celulaY === 0) continue   //Verifica se é a própria célula e pula
                
                //Cria variáveis para verificar os vizinhos
                const vizinhoX = x + celulaX
                const vizinhoY = y + celulaY

                if(vizinhoX >= 0 && vizinhoX < width && vizinhoY >= 0 && vizinhoY < width){
                    const vizinhosNum = vizinhoY * width + vizinhoX //Gera o numero final da célula do vizinho

                    if(bombas.has(vizinhosNum)){
                        return false    //Tem uma bomba ao redor
                    }
                }
            }
        }
        return true //Nenhuma bomba nos vizinhos
    }

    //Verificando se todos os navios foram afundados
    function verificarVitoria(){
        //Verificando se tem alguma parte com 'ocupado' que não esteja com 'true'
        const partesRestantes = Quadrados.filter(q => q.classList.contains('ocupado') && q.dataset.acertado !== 'true')

        if (partesRestantes.length === 0) { //Se todas as partes estiverem selecionadas
            console.log("Todos os navios foram afundados")
            somFundo.pause()
            somVitoria.play()

            alert("Parabéns! Você venceu!")
            reiniciarJogo()
        }
    }

    //Verificando o qual parte do navio
    function verificarNavioAfundado(nome){
        const partesDoNavio = Quadrados.filter(q => q.dataset.navio?.startsWith(nome))
        const todasAcertadas = partesDoNavio.every(q => q.dataset.acertado === 'true')

        if (todasAcertadas) {
            console.log(`Navio ${nome} foi completamente afundado!`)
            
            //Mostrando o navio afundado
            partesDoNavio.forEach((q) => {
                q.classList.remove('acerto')
                q.classList.add(`navio-${nome}-afundado`)
            })            

            /*  QUANDO TIVER AS IMAGENS AI COLOCAMOS ESSE CODIGO EM ACAO
            partesDoNavio.forEach((q, i) => {
                q.classList.remove('acerto')
                q.classList.add('navio-revelado')
    
                // Define imagem e posição da parte do navio
                q.style.backgroundImage = `url('./imgs/${nome}.png')`
                q.style.backgroundSize = `${partesDoNavio.length * 100}% 100%`
                q.style.backgroundPosition = `${i * -100}% 0%`
            })*/
        }
    }

    //Reiniciando o jogo
    function reiniciarJogo(){
        somFundo.pause()

        tabuleiro.innerHTML = ''
        Quadrados.length = 0

        quantVidas = 5
        atualizarVidas(quantVidas)

        areaTabuleiro.style.display = "none"
        areaDeRegras.style.display = "block"
    }

    //Gerando o tabuleiro completo
    function criarTabuleiro(tabuleiro, quadrados) {
    
        console.log("Criando tabuleiro")
        areaTabuleiro.style.display = 'block' //Muda o display para mostrar a área do tabuleiro
        areaDeRegras.style.display = 'none'  //Muda o display para ocultar a área das regras
        
        //som de fundo agua
        somFundo.currentTime = 0
        somFundo.play()

        for (let i = 0; i < width * width; i++) {
            const quad = document.createElement('div')  //Cria um quadrado
            quad.dataset.id = i                         //Atribui um id ao quadrado
            tabuleiro.appendChild(quad)                 //Adiciona o quadrado ao tabuleiro
            quadrados.push(quad)                        //Adiciona o quadrado ao array de quadrados

            //som de clique quadrado sem nada
            quad.addEventListener('click', () => {
                //Captura o tipo de clique (classe)
                const tipo = quad.dataset.tipo

                //Verificando se o quadrado já foi selecionado
                if (quad.classList.contains('clicado') || quad.classList.contains('explosao')) {
                    return
                }

                if(tipo === 'bomba'){
                    console.log("Clique em Bomba")
                    somBomba.currentTime = 0
                    somBomba.play()
                    quad.classList.add('explosao')
                    quantVidas--;
                    atualizarVidas(quantVidas)

                    if(quantVidas === 0){
                        atualizarVidas(quantVidas)
                        somDerrota.play()
                        alert("Game over")
                        reiniciarJogo()
                    }else{
                        atualizarVidas(quantVidas)
                    }

                }else if(quad.classList.contains('ocupado')){
                    //Acertou uma parte do navio
                    const nomeNavio = quad.dataset.navio.split('-parte-')[0] //pega o nome
                    console.log("Acertou o navio: ", nomeNavio)

                    somAfundado.currentTime = 0
                    somAfundado.play()
                    quad.classList.add('acerto')
                    quad.dataset.acertado = 'true'

                    verificarNavioAfundado(nomeNavio)
                    verificarVitoria()

                }else{
                    console.log("Clique em água")
                    somClique.currentTime = 0
                    somClique.play()

                    quad.classList.add('clicado')
                }
            })
        }
        // Coloca os navios no tabuleiro de forma aleatória
        navios.forEach(navio => {
            colocarNavio(quadrados, navio)
        })

        //Coloca as bombas
        geraBombas(quadrados, totalBombas)
    }

    //Adiciona um evento de click ao botão iniciar, que chama a função de criar o tabuleiro
    iniciar.addEventListener('click', () => criarTabuleiro(tabuleiro, Quadrados)) 

})
