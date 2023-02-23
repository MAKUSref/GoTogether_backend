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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller = __importStar(require("../controllers/Room"));
const router = express_1.default.Router();
router.post('/', controller.createRoom); // create room
router.get('/filter/hosted', controller.readHostedRooms); // get rooms by host id
router.get('/filter/requested', controller.readRequestedRooms); // get all requested rooms
router.get('/filter/accepted', controller.readAcceptedRooms); // get all accepted rooms
router.get('/filter/pin/:pin', controller.readRoomByPin); // get room with specific pin
router.get('/filter/room-users-info/:roomId', controller.readUsersInfoFromRoom); // get full info about users and hosts in room
router.get('/', controller.readRoom); // get all rooms
router.get('/my-rooms', controller.readProfileRooms); // get all your rooms (hosted, joined, requested)
router.get('/:roomId', controller.readSingleRoom); // get room by id
router.delete('/:roomId', controller.deleteRoom); // delete room
router.delete('/delete/users', controller.deleteFromUsers); // delete user from accepted users list
router.delete('/delete/requested', controller.deleteFromRequested); // delete user from requested users list
router.delete('/delete/hosts', controller.deleteFromHosts); // delete user from hosts list
router.patch('/join-user', controller.requestUserToJoin); // request user to room
router.patch('/accept-user', controller.acceptRequest); // accept user request
router.patch('/grant-host', controller.grantHost); // grant host role to user
exports.default = router;
