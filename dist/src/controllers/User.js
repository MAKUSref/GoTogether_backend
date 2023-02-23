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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCoords = exports.loginUser = exports.deleteUser = exports.readSingleUser = exports.readUser = exports.createUser = void 0;
const userMenagers = __importStar(require("../managers/User"));
const X_USER_ID = 'x-user-id';
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, login, password } = req.body;
    const createUserSuccess = yield userMenagers.createUser(name, login, password);
    if (createUserSuccess) {
        return res.status(201).json({ message: "User created." });
    }
    return res.status(400).json({ message: "User not created" });
});
exports.createUser = createUser;
const readUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userMenagers.getUsers();
    if (user !== undefined && user !== null) {
        return res.status(200).json({ user });
    }
    return res.status(404).json({ message: "Users not found" });
});
exports.readUser = readUser;
const readSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const user = yield userMenagers.getUser(userId);
    if (user.length !== 0) {
        return res.status(200).json({ user });
    }
    return res.status(404).json({ user, message: "Users not found" });
});
exports.readSingleUser = readSingleUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const userDeleteSuccess = yield userMenagers.deleteUser(userId);
    if (userDeleteSuccess) {
        return res.status(200).json({ message: "User deleted." });
    }
    return res.status(404).json({ message: "User not found." });
});
exports.deleteUser = deleteUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { login, password } = req.body;
    const user = yield userMenagers.loginUser(login, password);
    if (user) {
        return res.status(200).json({ user, message: "Login successfull" });
    }
    return res.status(400).json({ message: "Bad request." });
});
exports.loginUser = loginUser;
const updateCoords = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.headers[X_USER_ID];
    const { lat, long, radius, timestamp } = req.body;
    const updateSuccessfull = yield userMenagers.updateCoords(userId, { lat, long, radius, timestamp });
    if (updateSuccessfull) {
        return res.status(200).send({ message: "Coords updated!" });
    }
    return res.status(400).send({ message: "Something went wrong!" });
});
exports.updateCoords = updateCoords;
