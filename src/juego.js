import { valorCarta, generarCarta } from "./generadorCartas.js";
import { jugadorPedirCarta } from "./decisionJugador.js";
import { croupierPedirCarta } from "./decisionCroupier.js";

function ronda() {
  let sumaJugador = 0;
  let sumaJugadorA = 0;
  let jTieneA = false;
  let sumaCroupier = 0;
  let sumaCroupierA = 0;
  let cTieneA = false;
  let cartaJugador;
  let cartaCrupier;
  let pilaJugador;
  let pilaCroupier;
  let ganador; // 0 empate, 1 para jugador, 2 para croupier

  // Primera carta del jugador
  cartaJugador = generarCarta();
  pilaJugador = [cartaJugador];
  sumaJugador = valorCarta(cartaJugador[0]);
  jTieneA = esA(cartaJugador[0]);
  esA(cartaJugador[0])
    ? (sumaJugadorA = sumaJugador - 10)
    : (sumaJugadorA = sumaJugador);
  console.log(
    `${pilaJugador.length}° carta Jugador: ${cartaJugador[0]} ${
      cartaJugador[1]
    }, valor de la suma ${sumaJugador} ${
      sumaJugadorA != sumaJugador ? `| ${sumaJugadorA}` : ``
    }`
  );
  // Segunda carta del jugador
  cartaJugador = generarCarta();
  pilaJugador = [...pilaJugador, cartaJugador];
  sumaJugador += valorCarta(cartaJugador[0]);
  sumaJugadorA += valorCarta(cartaJugador[0]);
  if (jTieneA) {
    esA(cartaJugador[0])
      ? ((sumaJugador = sumaJugador - 10), (sumaJugadorA = sumaJugador - 10))
      : "";
  } else {
    esA(cartaJugador[0])
      ? ((sumaJugadorA = sumaJugador - 10), (jTieneA = true))
      : "";
  }
  console.log(
    `${pilaJugador.length}° carta Jugador: ${cartaJugador[0]} ${
      cartaJugador[1]
    }, valor de la suma ${sumaJugador} ${
      sumaJugador != sumaJugadorA ? `| ${sumaJugadorA}` : ``
    }`
  );

  // Tiene blackjack?
  if (esBlackJack(sumaJugador)) {
    ganador = 1;
    console.log(`¡Ganaste con BlackJack!`);
    return ganador;
  }

  // Primera carta del croupier
  cartaCrupier = generarCarta();
  pilaCroupier = [cartaCrupier];
  sumaCroupier = valorCarta(cartaCrupier[0]);
  esA(cartaCrupier[0])
    ? ((sumaCroupierA = sumaCroupier - 10), (cTieneA = true))
    : (sumaCroupierA = sumaCroupier);

  console.log(
    `${pilaCroupier.length}° carta del Croupier: ${cartaCrupier[0]} ${
      cartaCrupier[1]
    }, valor de la suma ${sumaCroupier} ${
      esA(cartaCrupier[0]) ? `| ${sumaCroupierA}` : ``
    }`
  );

  // ¿Pide otra carta el jugador?
  let b = 0;

  while (b == 0) {
    let pedir = prompt(`1- pedir carta; 2- quedarse`);
    if (/* jugadorPedirCarta(sumaJugador) */ pedir == 1) {
      cartaJugador = generarCarta();
      pilaJugador = [...pilaJugador, cartaJugador];
      sumaJugador += valorCarta(cartaJugador[0]);
      sumaJugadorA += valorCarta(cartaJugador[0]);
      if (jTieneA) {
        esA(cartaJugador[0])
          ? ((sumaJugador = sumaJugador - 10),
            (sumaJugadorA = sumaJugador - 10))
          : "";
      } else {
        esA(cartaJugador[0])
          ? ((sumaJugador = sumaJugador - 10),
            (jTieneA = true),
            console.log(sumaJugador, sumaJugadorA))
          : "";
      }
      if (sumaJugador > 21 && sumaJugadorA <= 21) {
        sumaJugador = sumaJugadorA;
      }
      console.log(
        `${pilaJugador.length}° carta Jugador: ${cartaJugador[0]} ${
          cartaJugador[1]
        }, valor de la suma ${sumaJugador} ${
          jTieneA ? `| ${sumaJugadorA}` : ``
        }`
      );
      // ¿Se ha pasado el jugador?
      if (seHaPasado(sumaJugador)) {
        ganador = 2;
        console.log(`Te pasaste, has perdido`);
        return ganador;
      }
    } else {
      b = 1;
    }
  }

  // El croupier pide carta:
  b = 0;

  while (b == 0) {
    if (croupierPedirCarta(sumaCroupier)) {
      cartaCrupier = generarCarta();
      pilaCroupier = [...pilaCroupier, cartaCrupier];
      sumaCroupier += valorCarta(cartaCrupier[0]);
      sumaCroupierA += valorCarta(cartaCrupier[0]);

      if (cTieneA) {
        esA(cartaCrupier[0])
          ? ((sumaCroupier = sumaCroupier - 10),
            (sumaCroupierA = sumaCroupier - 10))
          : "";
      } else {
        esA(cartaCrupier[0])
          ? ((sumaCroupierA = sumaCroupier - 10),
            (cTieneA = true),
            console.log(sumaCroupier, sumaCroupierA))
          : "";
      }
      if (sumaCroupier > 21 && sumaCroupierA <= 21) {
        sumaCroupier = sumaCroupierA;
      }
      console.log(
        `${pilaCroupier.length}° carta Croupier: ${cartaCrupier[0]} ${
          cartaCrupier[1]
        }, valor de la suma ${sumaCroupier} ${
          cTieneA ? `| ${sumaCroupierA}` : ``
        }`
      );

      if (pilaCroupier.length == 2 && esBlackJack(sumaCroupier)) {
        ganador = 2;
        console.log(`El Croupier ganó con BlackJack`);
        return ganador;
      }
    } else {
      b = 1;
    }
  }

  // ¿Se ha pasado el croupier?
  if (seHaPasado(sumaCroupier)) {
    ganador = 1;
    console.log(`El croupier se pasó, ganaste`);
    return ganador;
  }

  // ¿Quién ganó?
  if (sumaCroupier == sumaJugador && sumaCroupier <= 21 && sumaJugador <= 21) {
    ganador = 0;
    return ganador;
  } else if (
    sumaCroupier < sumaJugador &&
    sumaCroupier <= 21 &&
    sumaJugador <= 21
  ) {
    ganador = 1;
    console.log(`¡Ganaste!`);
    return ganador;
  } else if (
    sumaCroupier > sumaJugador &&
    sumaCroupier <= 21 &&
    sumaJugador <= 21
  ) {
    ganador = 2;
    console.log(`¡Ganó el Croupier!`);
    return ganador;
  }
  console.log(`FIN`);
}

function esBlackJack(suma) {
  if (suma == 21) {
    return true;
  } else {
    return false;
  }
}

function seHaPasado(suma) {
  if (suma > 21) {
    return true;
  } else {
    return false;
  }
}

function esA(n) {
  return n === `A` ? true : false;
}

function sentarse() {
  console.log(`¡Bienvenidos a BlackJack!`);
  let nombre = prompt("Ingrese su nombre");
  let dinero = parseInt(prompt("¿Cuánto dinero tiene?"));
  console.log(`Ingreso ${nombre} al juego con valor $${dinero} de fichas`);
  let apuesta;
  do {
    apuesta = parseInt(prompt("Ingrese su apuesta"));
  } while (apuesta < 0 || apuesta > dinero);
  let r;
  let b = 0;

  while (apuesta != 0 && dinero > 0) {
    if (b == 1) {
      do {
        apuesta = parseInt(prompt("Ingrese su apuesta. (con 0 se levanta)"));
      } while (apuesta < 0 || apuesta > dinero);
    } else {
      b = 1;
    }
    if (apuesta == 0) {
      console.log(`¡Muchas gracias por jugar!`);
      return;
    }
    console.log(`Ronda de BlackJack con apuesta de $${apuesta}`);
    r = ronda();
    if (r == 1) {
      dinero += apuesta;
      console.log(
        `¡Felicidades ${nombre}! Ganó $${apuesta}. Su dinero actual es $${dinero}`
      );
    } else if (r == 2) {
      dinero -= apuesta;
      console.log(`Perdió. Dinero actual $${dinero}`);
    } else {
      console.log(`¡Empate! Su dinero actual es $${dinero}`);
    }
  }
}

sentarse();
