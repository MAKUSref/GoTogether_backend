"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Redis_1 = __importDefault(require("../redis/Redis"));
const KEY = 'users';
class UserRepository {
    constructor() {
        this.redis = new Redis_1.default(KEY);
    }
    addUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.redis.addValue(user);
            return res;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.redis.getValues();
            return users;
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.getAll();
            return users.filter((user) => user.id === id);
        });
    }
    getUsersByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.getAll();
            return users.filter((user) => user.name === name);
        });
    }
    getUsersByLogin(login) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.getAll();
            return users.filter((user) => user.login === login);
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = (yield this.getAll()).filter((user) => user.id !== id);
            yield this.redis.setValues(users);
        });
    }
    updateCoords(id, coords) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = (yield this.getAll()).map((user) => {
                if (user.id === id) {
                    return Object.assign(Object.assign({}, user), { coords: Object.assign({}, coords) });
                }
                return user;
            });
            return yield this.redis.setValues(users);
        });
    }
}
exports.default = UserRepository;
