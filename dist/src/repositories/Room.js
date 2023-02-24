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
const KEY = "rooms";
class RoomRepository {
    constructor() {
        this.redis = new Redis_1.default(KEY);
    }
    addRoom(room) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.redis.addValue(room);
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const rooms = yield this.redis.getValues();
            return rooms;
        });
    }
    getBy(callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const rooms = yield this.getAll();
            return rooms.filter((room, index) => callback(room, index));
        });
    }
    getByRoomId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getBy((room) => room.id === id);
        });
    }
    getByRoomPin(pin) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getBy((room) => room.pin === pin);
        });
    }
    getByHostId(hostId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getBy((room) => room.hosts.includes(hostId));
        });
    }
    getByRequestedUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getBy((room) => room.requestingUsers.includes(userId));
        });
    }
    getByAcceptedUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getBy((room) => room.users.includes(userId));
        });
    }
    deleteRoom(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const rooms = (yield this.getAll()).filter((room) => room.id !== id);
            return yield this.redis.setValues(rooms);
        });
    }
    deleteFromUserList(roomId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const rooms = yield this.getAll();
            const updatedRoom = rooms.map((room) => {
                if (room.id === roomId) {
                    room.users = room.users.filter((id) => id !== userId);
                }
                return room;
            });
            return yield this.redis.setValues(updatedRoom);
        });
    }
    deleteFromHostsList(roomId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const rooms = yield this.getAll();
            const updatedRoom = rooms.map((room) => {
                if (room.id === roomId) {
                    room.hosts = room.hosts.filter((id) => id !== userId);
                }
                return room;
            });
            return yield this.redis.setValues(updatedRoom);
        });
    }
    deleteFromRequestedList(roomId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const rooms = yield this.getAll();
            const updatedRoom = rooms.map((room) => {
                if (room.id === roomId) {
                    room.requestingUsers = room.requestingUsers.filter((id) => id !== userId);
                }
                return room;
            });
            return yield this.redis.setValues(updatedRoom);
        });
    }
    requestUserToRoom(pin, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const rooms = yield this.getAll();
            const updatedRoom = rooms.map((room) => {
                if (room.pin === pin) {
                    room.requestingUsers.push(userId);
                }
                return room;
            });
            return yield this.redis.setValues(updatedRoom);
        });
    }
    acceptUserRequest(roomId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const rooms = yield this.getAll();
            const updatedRoom = rooms.map((room) => {
                if (room.id === roomId) {
                    room.requestingUsers = room.requestingUsers.filter((id) => id !== userId);
                    room.users.push(userId);
                }
                return room;
            });
            return yield this.redis.setValues(updatedRoom);
        });
    }
    grantHost(roomId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const rooms = yield this.getAll();
            const updatedRoom = rooms.map((room) => {
                if (room.id === roomId) {
                    room.users = room.users.filter((id) => id !== userId);
                    room.hosts.push(userId);
                }
                return room;
            });
            return yield this.redis.setValues(updatedRoom);
        });
    }
    leaveRoom(roomId, requestingUsers) {
        return __awaiter(this, void 0, void 0, function* () {
            const rooms = yield this.getAll();
            const updatedRoom = rooms.map((room) => {
                if (room.id === roomId) {
                    room.hosts = room.users.filter((id) => id !== requestingUsers);
                    room.users = room.users.filter((id) => id !== requestingUsers);
                    room.requestingUsers = room.users.filter((id) => id !== requestingUsers);
                }
                return room;
            });
            return yield this.redis.setValues(updatedRoom);
        });
    }
}
exports.default = RoomRepository;
