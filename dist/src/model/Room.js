"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid4_1 = __importDefault(require("uuid4"));
class Room {
    constructor({ id = (0, uuid4_1.default)(), name, hosts, users = [], requestingUsers = [], pin, }) {
        this.id = id;
        this.name = name;
        this.users = [...users];
        this.hosts = [...hosts];
        this.pin = pin;
        this.requestingUsers = [...requestingUsers];
    }
}
exports.default = Room;
