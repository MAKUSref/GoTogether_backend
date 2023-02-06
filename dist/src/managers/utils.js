"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePin = void 0;
const MAX_PIN = 99999;
const MIN_PIN = 10000;
function generatePin(pins) {
    const pin = Math.floor(Math.random() * (MAX_PIN - MIN_PIN + 1) + MIN_PIN);
    if (pins.includes(pin))
        return generatePin(pins);
    return pin;
}
exports.generatePin = generatePin;
