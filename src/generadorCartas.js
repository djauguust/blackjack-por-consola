export function generarCarta() {
  let numero = Math.random();
  let palo = Math.random();
  // Genero Número
  if (0 <= numero && numero < 1 / 13) {
    numero = `A`;
  } else if (1 / 13 <= numero && numero < 2 / 13) {
    numero = `2`;
  } else if (2 / 13 <= numero && numero < 3 / 13) {
    numero = `3`;
  } else if (3 / 13 <= numero && numero < 4 / 13) {
    numero = `4`;
  } else if (4 / 13 <= numero && numero < 5 / 13) {
    numero = `5`;
  } else if (5 / 13 <= numero && numero < 6 / 13) {
    numero = `6`;
  } else if (6 / 13 <= numero && numero < 7 / 13) {
    numero = `7`;
  } else if (7 / 13 <= numero && numero < 8 / 13) {
    numero = `8`;
  } else if (8 / 13 <= numero && numero < 9 / 13) {
    numero = `9`;
  } else if (9 / 13 <= numero && numero < 10 / 13) {
    numero = `10`;
  } else if (10 / 13 <= numero && numero < 11 / 13) {
    numero = `J`;
  } else if (11 / 13 <= numero && numero < 12 / 13) {
    numero = `Q`;
  } else {
    numero = `K`;
  }
  // Genero Palo
  if (0 <= palo && palo < 1 / 4) {
    palo = `♥`;
  } else if (1 / 4 <= palo && palo < 2 / 4) {
    palo = `♤`;
  } else if (2 / 4 <= palo && palo < 3 / 4) {
    palo = `♧`;
  } else {
    palo = `♢`;
  }
  return [numero, palo];
}

export function valorCarta(c) {
  if (c <= 10) {
    return parseInt(c);
  } else if (c == `J` || c == `Q` || c == `K`) {
    return 10;
  } else {
    return 11;
  }
}
//let h = generarCarta();
//console.log(h[0],h[1]);
