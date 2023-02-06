"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RoomRepository {
    constructor() {
        this.rooms = [];
    }
    addRoom(room) {
        this.rooms.push(room);
    }
    deleteRoom(id) {
        this.rooms = this.rooms.filter((room) => room.id !== id);
    }
    getRoomById(id) {
        return this.rooms.filter((room) => room.id === id);
    }
    getRoomByLoginNumber(loginNumber) {
        return this.rooms.filter((room) => room.loginNumber === loginNumber);
    }
}
exports.default = RoomRepository;
