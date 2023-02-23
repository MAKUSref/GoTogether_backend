"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const Sockets_1 = __importDefault(require("./src/sockets/Sockets"));
const http_1 = __importDefault(require("http"));
const Room_1 = __importDefault(require("./src/routes/Room"));
const User_1 = __importDefault(require("./src/routes/User"));
dotenv_1.default.config();
const port = process.env.PORT || "4040";
const router = (0, express_1.default)();
(() => {
    router.use(express_1.default.json());
    router.use(express_1.default.urlencoded({ extended: true }));
    // Rules of our API 
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }
        next();
    });
    // Routes
    router.use('/api/room', Room_1.default);
    router.use('/api/user', User_1.default);
    const server = http_1.default.createServer(router);
    router.get("/api/", (req, res) => {
        console.log(`[server]: control status get`);
        res.status(200).json({ status: "OK" });
    });
    new Sockets_1.default(server);
    // const io = new Server(server);
    // io.on("connection", (socket) => {
    //   const userId = socket.handshake.query['user-id'];
    //   console.log(`[server][io]: user connected (${userId}).`);
    //   socket.on("disconnect", () => {
    //     console.log("[server][io]: user disconnected");
    //   });
    // });
    server.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}/`);
    });
})();
