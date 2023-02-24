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
const dotenv_1 = __importDefault(require("dotenv"));
const redis_1 = require("redis");
dotenv_1.default.config();
const REDIS_URL = process.env.REDIS_URL;
class Redis {
    constructor(key) {
        this.client = (0, redis_1.createClient)({
            url: REDIS_URL
        });
        this.isConnected = false;
        this.key = key;
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.disconnect();
        });
    }
    getValues() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkConnection();
            const res = (yield this.client.get(this.key));
            const arr = (yield JSON.parse(res));
            return arr;
        });
    }
    addValue(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.checkConnection();
            const currentState = yield this.getValues();
            return (yield this.setValues([...currentState, data])) && res;
        });
    }
    setValues(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.checkConnection();
            return !!(yield this.client.set(this.key, JSON.stringify(data))) && res;
        });
    }
    // private
    checkConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isConnected) {
                return (yield this.connect());
            }
            return true;
        });
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.connect().then(() => __awaiter(this, void 0, void 0, function* () {
                    this.isConnected = true;
                    yield this.initValues();
                }));
                return true;
            }
            catch (err) {
                return false;
            }
        });
    }
    initValues() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.getValues();
            if (res === undefined || res === null) {
                yield this.setValues([]);
            }
        });
    }
}
exports.default = Redis;
