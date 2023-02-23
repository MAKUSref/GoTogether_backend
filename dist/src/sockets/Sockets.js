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
const socket_io_1 = require("socket.io");
// import UserRepository from "../repositories/User";
const userManager = __importStar(require("../managers/User"));
class Sockets {
    constructor(server) {
        this.io = new socket_io_1.Server(server);
        this.handleConnection = this.handleConnection.bind(this);
        if (this.io !== undefined) {
            this.init();
        }
        else {
            console.log("[server][io]: Socket.io server cannot initialize.");
        }
    }
    init() {
        this.io.on("connection", this.handleConnection);
    }
    handleConnection(socket) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = socket.handshake.query["user-id"];
            const userExist = userManager.getUser(userId);
            if (!userExist) {
                console.log(`[server][io]: user with id: ${userId} does not exist.`);
                console.log(`[server][io]: disconnecting...`);
                socket.disconnect();
                return;
            }
            console.log(`[server][io]: user connected - ${userId}.`);
            // socket.join(userId);
            // console.log(this.io.of("/").adapter.rooms);
            socket.on("disconnect", () => this.handleDisconnect(socket, userId));
            socket.broadcast.emit("test", `user joined! (id - ${userId})`);
        });
    }
    handleDisconnect(socket, userId) {
        console.log(`[server][io]: user disconnected - ${userId}`);
        // socket.leave(userId);
    }
}
exports.default = Sockets;
