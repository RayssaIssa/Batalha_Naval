# 🛳️ Batalha Naval
🚀 Jogo Web desenvolvido durante a disciplina de Paradigmas de Programação (2025) no curso de Ciência da Computação - UFJ

Clique <a href="https://batalha-naval-beta.vercel.app/">aqui</a>, jogue e se divirta!

## Sobre o jogo
O jogo Batalha Naval é um jogo de tabuleiro que tem como objetivo afundar todos os navios do enimigo. Em nosso jogo, implementamos um sistema de vidas, o jogador inicia com 5 vidas e perde uma toda vez que acertar uma bomba, as bombas estão escondidas de maneira aleátoria no tabuleiro, quando todas as vidas acabarem, o jogador perde o jogo ☠️.

Existem 5 navios:
- Um **porta-aviões**, que ocupa 5 quadrados;
- Um **navio-tanque**, que ocupa 4 quadrados;
- Um **destrutor**, que ocupa 3 quadrados;
- Uma **fragata**, que ocupa 3 quadrados;
- Um **submarino**, que ocupa 2 quadrados.
  
No jogo, cada ataque (clique) do jogador é uma bomba, e ela tem 3 destinos possíveis: 
- Acertar a água 🌊, nada acontece, o jogador continua a atacar
- Acertar uma bomba 💣 do inimigo, o jogador **perde** uma vida
- Acertar uma parte de um navio 🚢, o jogador continua a atacar

🏆 Vence o jogo quando **todos os navios são afundados**.
