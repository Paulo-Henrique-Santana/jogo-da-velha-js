const textoVezX = document.querySelector('.vez-x')
const textoVezO = document.querySelector('.vez-o');
const espacos = document.querySelectorAll('.jogo span');
const resultado = document.querySelector('.resultado');
const btnReiniciar = document.querySelector('.btn-reiniciar');
let usuario = 'x';
let pc = 'o';
let jogadorVez = usuario;

let jogadas = [];
let formasDeGanhar = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

const trocarVez = () =>  {
  jogadorVez = (jogadorVez === usuario) ? pc : usuario
  textoVezX.classList.toggle('ativo');
  textoVezO.classList.toggle('ativo');
}

const desabilitarVez = () => {
  textoVezX.classList.remove('ativo');
  textoVezO.classList.remove('ativo');
  espacos.forEach((espaco) => espaco.removeEventListener('click', addJogadaUsuario));
}

const verificarVitoria = () => {
  const ganhou = formasDeGanhar.some(forma => {
    if (jogadas[forma[0]])
      return jogadas[forma[0]] === jogadas[forma[1]] && jogadas[forma[1]] === jogadas[forma[2]]
  });
  return ganhou;
}

const verificarFim = () => jogadas.every((jogada) => jogada !== null);

const verificarResultado = () => {
  if (verificarVitoria()) {
    resultado.innerText = `Jogador '${jogadorVez}' venceu!`;
    btnReiniciar.classList.add('ativo');
    desabilitarVez();
    return true;
  } else if (verificarFim()) {
    resultado.innerText = 'Empate';
    btnReiniciar.classList.add('ativo');
    desabilitarVez();
    return true;
  }
  return false;
}

const sortearPosicaoPc = () => {
  let posicao = Math.round(Math.random() * (9 - 0) + 0);
  while (jogadas[posicao] !== null) {
    posicao = Math.round(Math.random() * (9 - 0) + 0);
  }
  return posicao;
}

const addJogadaPc = () => {
  posicao = sortearPosicaoPc();
  espacos[posicao].innerText = pc;
  jogadas[posicao] = pc;
  if (!verificarResultado()) {
    trocarVez();
    espacos.forEach((espaco) => espaco.addEventListener('click', addJogadaUsuario));
  }
}

const addJogadaUsuario = (event) => {
  if (event.target.innerText === '') {
    event.target.classList.add('x');
    event.target.innerText = usuario;
    espacos.forEach((espaco, index) => {
      if (espaco.innerText === usuario) jogadas[index] = usuario;
      if (!jogadas[index]) jogadas[index] = null;
    });
    if (!verificarResultado()) {
      trocarVez();
      espacos.forEach((espaco) => espaco.removeEventListener('click', addJogadaUsuario));
      setTimeout(addJogadaPc, 750);
    }
  }
}

const reinciar = () => {
  textoVezX.classList.add('ativo');
  jogadorVez = usuario;
  jogadas = [];
  espacos.forEach((espaco) => {
    espaco.innerText = '';
    espaco.addEventListener('click', addJogadaUsuario);
    espaco.classList.remove('x');
  });
  resultado.innerText = '';
  btnReiniciar.classList.remove('ativo');
}


espacos.forEach((espaco) => espaco.addEventListener('click', addJogadaUsuario));
btnReiniciar.addEventListener('click', reinciar);