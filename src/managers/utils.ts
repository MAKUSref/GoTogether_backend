const MAX_PIN = 99999;
const MIN_PIN = 10000;

export function generatePin(pins: number[]): number {
  const pin = Math.floor(Math.random() * (MAX_PIN - MIN_PIN + 1) + MIN_PIN);

  if (pins.includes(pin)) return generatePin(pins);
  return pin;
}
