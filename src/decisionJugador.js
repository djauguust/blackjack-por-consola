export function jugadorPedirCarta(sumaJugador) {
  if (sumaJugador >= 12) {
    return false;
  } else if (sumaJugador <= 11) {
    return true;
  }
}
