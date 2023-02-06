"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.loginUser = exports.deleteUser = exports.createUser = exports.getUser = exports.getUsers = void 0;
const User_1 = __importStar(require("../model/User"));
const User_2 = __importDefault(require("../repositories/User"));
const userRepo = new User_2.default();
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield userRepo.getAll();
    return users;
});
exports.getUsers = getUsers;
const getUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield userRepo.getUserById(id);
    return users;
});
exports.getUser = getUser;
const createUser = (name, login, password) => __awaiter(void 0, void 0, void 0, function* () {
    if (!name || !login || !password)
        return false;
    const isLoginUniq = (yield userRepo.getUsersByLogin(login)).length === 0;
    if (!isLoginUniq)
        return false;
    const newUser = new User_1.default(name, login, password, User_1.USER_TYPE.User);
    const res = yield userRepo.addUser(newUser);
    return res;
});
exports.createUser = createUser;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const [user] = yield userRepo.getUserById(id);
    if (user === undefined || user === null) {
        return false;
    }
    userRepo.deleteUser(id);
    return true;
});
exports.deleteUser = deleteUser;
const loginUser = (login, password) => __awaiter(void 0, void 0, void 0, function* () {
    const [user] = yield userRepo.getUsersByLogin(login);
    if (user === undefined || user === null)
        return; // user doeas not exist
    if (user.password !== password)
        return; // bad password
    return user;
});
exports.loginUser = loginUser;
