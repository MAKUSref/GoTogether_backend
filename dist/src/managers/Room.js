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
exports.acceptRequest = exports.requestUserToRoom = exports.deleteFromRequestedList = exports.deleteFromHosts = exports.deleteFromUsers = exports.deleteRoom = exports.readProfileRooms = exports.readAcceptedRooms = exports.readRequestedRooms = exports.readRoomByPin = exports.readRoomByHostId = exports.readRoom = exports.readRooms = exports.createRoom = void 0;
const Room_1 = __importDefault(require("../model/Room"));
const User_1 = require("../model/User");
const Room_2 = __importDefault(require("../repositories/Room"));
const User_2 = __importDefault(require("../repositories/User"));
const utils_1 = require("./utils");
const roomRepo = new Room_2.default();
const userRepo = new User_2.default();
const createRoom = (userId, name) => __awaiter(void 0, void 0, void 0, function* () {
    const [user] = yield userRepo.getUserById(userId);
    if (!user)
        return false; // user does not exist
    if (user.type === User_1.USER_TYPE.Guest)
        return false; // Guest cannot make rooms
    if (!name)
        return false; // name cannot be empty string
    const pins = (yield roomRepo.getAll()).map((room) => room.pin);
    const uniqPin = (0, utils_1.generatePin)(pins);
    const newRoom = new Room_1.default({ name, hosts: [userId], pin: uniqPin });
    const addRoomSuccess = yield roomRepo.addRoom(newRoom);
    return addRoomSuccess;
});
exports.createRoom = createRoom;
const readRooms = () => __awaiter(void 0, void 0, void 0, function* () {
    const rooms = yield roomRepo.getAll();
    return rooms;
});
exports.readRooms = readRooms;
const readRoom = (roomId) => __awaiter(void 0, void 0, void 0, function* () {
    const room = roomRepo.getByRoomId(roomId);
    return room;
});
exports.readRoom = readRoom;
const readRoomByHostId = (hostId) => __awaiter(void 0, void 0, void 0, function* () {
    const rooms = yield roomRepo.getByHostId(hostId);
    return rooms;
});
exports.readRoomByHostId = readRoomByHostId;
const readRoomByPin = (pin) => __awaiter(void 0, void 0, void 0, function* () {
    const rooms = yield roomRepo.getByRoomPin(pin);
    return rooms;
});
exports.readRoomByPin = readRoomByPin;
const readRequestedRooms = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const rooms = yield roomRepo.getByRequestedUserId(userId);
    return rooms;
});
exports.readRequestedRooms = readRequestedRooms;
const readAcceptedRooms = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const rooms = yield roomRepo.getByAcceptedUserId(userId);
    return rooms;
});
exports.readAcceptedRooms = readAcceptedRooms;
const readProfileRooms = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const hostedRooms = yield roomRepo.getByHostId(userId);
    const joinedRooms = yield roomRepo.getByAcceptedUserId(userId);
    const requestedRooms = yield roomRepo.getByRequestedUserId(userId);
    return {
        host: hostedRooms,
        user: joinedRooms,
        request: requestedRooms
    };
});
exports.readProfileRooms = readProfileRooms;
const deleteRoom = (roomId) => __awaiter(void 0, void 0, void 0, function* () {
    const [room] = yield roomRepo.getByRoomId(roomId);
    if (!room)
        return false;
    yield roomRepo.deleteRoom(roomId);
    return true;
});
exports.deleteRoom = deleteRoom;
const deleteFromUsers = (roomId, userId, requestingUserId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userRepo.getUserById(userId);
    const requestingUser = yield userRepo.getUserById(requestingUserId);
    const room = yield roomRepo.getByRoomId(roomId);
    if (!user.length)
        return false; // user does not exist
    if (!requestingUser.length)
        return false; // requesting user does not exist
    if (!room.length)
        return false; // room does not exist
    if (!room[0].users.includes(userId))
        return false; // there is no such user in user list
    if (!room[0].hosts.includes(requestingUserId))
        return false; // only hosts from this room can delete other users
    return yield roomRepo.deleteFromUserList(roomId, userId);
});
exports.deleteFromUsers = deleteFromUsers;
const deleteFromHosts = (roomId, userId, requestingUserId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userRepo.getUserById(userId);
    const requestingUser = yield userRepo.getUserById(requestingUserId);
    const room = yield roomRepo.getByRoomId(roomId);
    if (!user.length)
        return false; // user does not exist
    if (!requestingUser.length)
        return false; // requesting user does not exist
    if (!room.length)
        return false; // room does not exist
    if (!room[0].hosts.includes(userId))
        return false; // there is no such user in hosts list
    if (!room[0].hosts.includes(requestingUserId))
        return false; // only hosts from this room can delete other users
    return yield roomRepo.deleteFromHostsList(roomId, userId);
});
exports.deleteFromHosts = deleteFromHosts;
const deleteFromRequestedList = (roomId, userId, requestingUserId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userRepo.getUserById(userId);
    const requestingUser = yield userRepo.getUserById(requestingUserId);
    const room = yield roomRepo.getByRoomId(roomId);
    if (!user.length)
        return false; // user does not exist
    if (!requestingUser.length)
        return false; // requesting user does not exist
    if (!room.length)
        return false; // room does not exist
    if (!room[0].requestingUsers.includes(userId))
        return false; // there is no such user in requesting list
    if (!room[0].hosts.includes(requestingUserId))
        return false; // only hosts from this room can delete other users
    return yield roomRepo.deleteFromRequestedList(roomId, userId);
});
exports.deleteFromRequestedList = deleteFromRequestedList;
const requestUserToRoom = (pin, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userRepo.getUserById(userId);
    const room = yield roomRepo.getByRoomPin(pin);
    if (!user.length)
        return false; // user does not exist
    if (!room.length)
        return false; // room does not exist
    if (room[0].requestingUsers.includes(userId))
        return false; // user already requests to room
    if (room[0].hosts.includes(userId))
        return false; // user already belongs to hosts list
    if (room[0].users.includes(userId))
        return false; // user already belongs to users list
    return yield roomRepo.requestUserToRoom(pin, userId);
});
exports.requestUserToRoom = requestUserToRoom;
const acceptRequest = (roomId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userRepo.getUserById(userId);
    const room = yield roomRepo.getByRoomId(roomId);
    if (!user.length)
        return false; // user does not exist
    if (!room.length)
        return false; // room does not exist
    if (!room[0].requestingUsers.includes(userId))
        return false; // there is no request from this user
    return yield roomRepo.acceptUserRequest(roomId, userId);
});
exports.acceptRequest = acceptRequest;
