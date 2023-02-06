"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER_TYPE = void 0;
const uuid4_1 = __importDefault(require("uuid4"));
var USER_TYPE;
(function (USER_TYPE) {
    USER_TYPE["User"] = "User";
    USER_TYPE["Guest"] = "Guest";
})(USER_TYPE = exports.USER_TYPE || (exports.USER_TYPE = {}));
class User {
    constructor(name, login, password, type, id = (0, uuid4_1.default)()) {
        this.id = id;
        this.name = name;
        this.login = login;
        this.password = password;
        this.type = type;
    }
}
exports.default = User;
