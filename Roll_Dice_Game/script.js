'use strict';

// setiranje elemenata
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let score, currentScore, activePlayer, playing; // deklaracija varijabli

// pocetni uvjeti
const init = function () {
  // init funkcija inicijalizira igru
  score = [0, 0]; // score array sprema rezultat igraca 0 na indeksu 0 i igraca 1 na indeksu 1
  currentScore = 0; // setiranje vrijednosti iz lobal scope
  activePlayer = 0;
  playing = true; // na pocetku igre varijabla playing je true

  // resetiranje rezultata igraca 1 i igraca 2
  score0El.textContent = 0; // reset ukupnog rezultata igraca 1 na 0
  score1El.textContent = 0; // reset ukupnog rezultata igraca 2 na 0
  current0El.textContent = 0; // reset trenutnog rezultata igraca 1 na 0
  current1El.textContent = 0; // reset trenutnog rezultata igraca 2 na 0

  diceEl.classList.add('hidden'); // sakrij kocku
  player0El.classList.remove('player--winner'); // ukloni igrac 1 "winner class" (tamna pozadina)
  player1El.classList.remove('player--winner'); // ukloni igrac 2 "winner class" (tamna pozadina)
  player0El.classList.add('player--active'); // igrac 1 se postavlja na aktivnog igraca
  player1El.classList.remove('player--active'); // igrac 2 se uklanja sa aktivnog igraca
};
init();

// funkcija zamjena igraca u igri
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle(`player--active`);
  player1El.classList.toggle(`player--active`);
};

// funkcija bacanja kocke
btnRoll.addEventListener('click', function () {
  if (playing) {
    // (name of event, handler function)

    // 1. generiranje nasumicnog bacanja kocke
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    // 2. prikaz kocke
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`; // source property setiran na string->dinamicki loada 6 slika od kocke

    // 3. provjera kod bacanja kocke (broj 1) ako je uvjet istinit,
    if (dice !== 1) {
      // ako kockica nije pala na broj 1 -> dodaj rezultat bacanja i broj pokusaja u trenutni rezultat
      currentScore = currentScore + dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore; // selektira element dinamicki i textContent spremi u trenutni rezultat

      current0El.textContent = currentScore;
    } else {
      // ako je kockica pala na broj 1 -> prebaci na drugog igraca
      switchPlayer();
      // objašnjenje šta radi funckija switchPlayer (zamjena aktivni - neaktivni igrac)
      // document.getElementById(`current--${activePlayer}`).textContent = 0; // postavi trenutnog aktivnog igraca na 0 prije prebacivanja na igraca 2
      // currentScore = 0;
      // activePlayer = activePlayer === 0 ? 1 : 0; // ternary operator -> zamjena igraca 1 i igraca 2 u igri
      // player0El.classList.toggle('player--active'); // ako igrac 1 nije aktivan -> toggle ce ga setirat u aktivno (minja boju)
      // player1El.classList.toggle('player--active'); // ako igrac 1 je aktivan -> toggle ce ga uklonit (minja boju)
    }
  }
});

btnHold.addEventListener('click', function () {
  // funkcija ce biti izvrsena kada igrac pritisne botun
  if (playing) { // ako je uvjet tocan
    // 1. dodaj trenutni rezultat u rezultat aktivnog igraca
    // score[1] = score[1] + currentScore
    score[activePlayer] = score[activePlayer] + currentScore;

    // scores[1] = scores[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer]; // dinamicki shifta sa igraca 1 na igraca 2 -> score--0 i score--1 -> umisto 0 ili 1 pišemo {vrijednost aktivni igrač}, to je score--0 ili score--1

    // 2. provjera je li rezultat aktivnog igraca 100 veći ili jednak 100
    // ako je score 100 ili veći -> završi igru,
    // ako nije prebaci na drugog igraca
    if (score[activePlayer] >= 100) {
      // i zavrsi igru
      playing = false; // kada je igra zavrsena, setiramo varijablul playing na false
      diceEl.classList.add('hidden'); // kada igrac pobjedi, kocka postaje hidden -> hidden class je dodana
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);
    } else {
      // prebaci na drugog igraca
      switchPlayer();
    } //  kada neki igrac pobjedi, igra je gotova (setiramo playing na false)
  }
});

// resetira sve rezultate na 0 i uklanja "winner class"
btnNew.addEventListener('click', init);
// addEventListener čeka da se dogodi klik i tad će odradit funckiju init -> resetiranje igre na 0
