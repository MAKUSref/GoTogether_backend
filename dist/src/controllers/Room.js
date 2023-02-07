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
exports.acceptRequest = exports.requestUserToJoin = exports.deleteFromHosts = exports.deleteFromRequested = exports.deleteFromUsers = exports.deleteRoom = exports.createRoom = exports.readAcceptedRooms = exports.readRequestedRooms = exports.readHostedRooms = exports.readSingleRoom = exports.readRoom = void 0;
const roomManager = __importStar(require("../managers/Room"));
const X_USER_ID = 'x-user-id';
const readRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const room = yield roomManager.readRooms();
    if (room !== undefined && room !== null) {
        return res.status(200).json({ room });
    }
    return res.status(404).json({ room, message: "No rooms were found." });
});
exports.readRoom = readRoom;
const readSingleRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const roomId = req.params.roomId;
    const room = yield roomManager.readRoom(roomId);
    if (room !== undefined && room !== null) {
        return res.status(200).json({ room });
    }
    return res.status(404).json({ room, message: "No rooms were found." });
});
exports.readSingleRoom = readSingleRoom;
const readHostedRooms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hostId = req.headers[X_USER_ID];
    const room = yield roomManager.readRoomByHostId(hostId);
    if (room !== undefined && room !== null) {
        return res.status(200).json({ room });
    }
    return res.status(404).json({ room, message: "No rooms were found." });
});
exports.readHostedRooms = readHostedRooms;
const readRequestedRooms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.headers[X_USER_ID];
    const room = yield roomManager.readRequestedRooms(userId);
    if (room !== undefined && room !== null) {
        return res.status(200).json({ room });
    }
    return res.status(404).json({ room, message: "No rooms were found." });
});
exports.readRequestedRooms = readRequestedRooms;
const readAcceptedRooms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.headers[X_USER_ID];
    const room = yield roomManager.readAcceptedRooms(userId);
    if (room !== undefined && room !== null) {
        return res.status(200).json({ room });
    }
    return res.status(404).json({ room, message: "No rooms were found." });
});
exports.readAcceptedRooms = readAcceptedRooms;
const createRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.headers[X_USER_ID];
    const { name } = req.body;
    const createRoomSuccess = yield roomManager.createRoom(userId, name);
    if (createRoomSuccess) {
        return res.status(201).send({ message: "Room created." });
    }
    return res.status(400).send({ message: "Bad request!" });
});
exports.createRoom = createRoom;
const deleteRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const roomId = req.params.roomId;
    const deleteRoomSuccess = yield roomManager.deleteRoom(roomId);
    if (deleteRoomSuccess) {
        return res.status(201).send({ message: "Room deleted." });
    }
    return res.status(404).send({ message: "Room with this id does not exist!" });
});
exports.deleteRoom = deleteRoom;
const deleteFromUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { roomId, userId } = req.body;
    const requestingUserId = req.headers[X_USER_ID];
    const deleteUserSuccess = yield roomManager.deleteFromUsers(roomId, userId, requestingUserId);
    if (deleteUserSuccess) {
        return res.status(201).send({ message: "User deleted." });
    }
    return res.status(404).send({ message: "User not found!" });
});
exports.deleteFromUsers = deleteFromUsers;
const deleteFromRequested = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { roomId, userId } = req.body;
    const requestingUserId = req.headers[X_USER_ID];
    const deleteUserSuccess = yield roomManager.deleteFromRequestedList(roomId, userId, requestingUserId);
    if (deleteUserSuccess) {
        return res.status(201).send({ message: "User deleted." });
    }
    return res.status(404).send({ message: "User not found!" });
});
exports.deleteFromRequested = deleteFromRequested;
const deleteFromHosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { roomId, userId } = req.body;
    const requestingUserId = req.headers[X_USER_ID];
    const deleteUserSuccess = yield roomManager.deleteFromHosts(roomId, userId, requestingUserId);
    if (deleteUserSuccess) {
        return res.status(201).send({ message: "User deleted." });
    }
    return res.status(404).send({ message: "User not found!" });
});
exports.deleteFromHosts = deleteFromHosts;
const requestUserToJoin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pin, userId } = req.body;
    const isUserAdded = yield roomManager.requestUserToRoom(pin, userId);
    if (isUserAdded) {
        return res.status(201).send({ message: "User joined to room correctly." });
    }
    return res.status(400).send({ message: "User did not join!" });
});
exports.requestUserToJoin = requestUserToJoin;
const acceptRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { roomId, userId } = req.body;
    const isUserAccepted = yield roomManager.acceptRequest(roomId, userId);
    if (isUserAccepted) {
        return res.status(201).send({ message: "User accepted." });
    }
    return res.status(400).send({ message: "Something went wrong!" });
});
exports.acceptRequest = acceptRequest;
