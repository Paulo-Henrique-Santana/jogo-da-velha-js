const textoVezX = document.querySelector('.vez-x')
const textoVezO = document.querySelector('.vez-o');
const espacos = document.querySelectorAll('.jogo span');
const resultado = document.querySelector('.resultado');
const btnReiniciar = document.querySelector('.btn-reiniciar');
let jogador = 'x';
let jogadas = [];
let formasDeGanhar = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

const trocarVez = () =>  {
  jogador = (jogador === 'x') ? 'o' : 'x';
  textoVezX.classList.toggle('ativo');
  textoVezO.classList.toggle('ativo');
}

const desabilitarVez = () => {
  textoVezX.classList.remove('ativo');
  textoVezO.classList.remove('ativo');
  espacos.forEach((espaco) => espaco.removeEventListener('click', addJogada));
}

const verificarVitoria = () => {
  const ganhou = formasDeGanhar.some(forma => {
    if (jogadas[forma[0]])
      return jogadas[forma[0]] === jogadas[forma[1]] && jogadas[forma[1]] === jogadas[forma[2]]
  });
  return ganhou;
}

const verificarFim = () => jogadas.every(jogada => jogada !== null);

const verificarResultado = () => {
  if (verificarVitoria()) {
    resultado.innerText = `Jogador '${jogador}' venceu!`;
    btnReiniciar.classList.add('ativo');
    desabilitarVez();
  } else if (verificarFim()) {
    resultado.innerText = 'Empate';
    btnReiniciar.classList.add('ativo');
    desabilitarVez();
  } else {
    trocarVez();
  }
}

const addJogada = (event) => {
  if (event.target.innerText === '') {
    if (jogador === 'x') event.target.classList.add('x');
    event.target.innerText = jogador;
    espacos.forEach((espaco, index) => {
      if (espaco.innerText === jogador) jogadas[index] = jogador;
      if (!jogadas[index]) jogadas[index] = null;
    });
    verificarResultado();
  } 
}

const reinciar = () => {
  textoVezX.classList.add('ativo');
  jogador = 'x';
  jogadas = []
  espacos.forEach((espaco) => {
    espaco.innerText = '';
    espaco.addEventListener('click', addJogada);
    espaco.classList.remove('x');
  });
  resultado.innerText = '';
  btnReiniciar.classList.remove('ativo');
}


espacos.forEach((espaco) => espaco.addEventListener('click', addJogada));
btnReiniciar.addEventListener('click', reinciar);