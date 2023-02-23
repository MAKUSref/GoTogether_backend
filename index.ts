import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import http from "http";
import roomRoutes from './src/routes/Room';
import userRoutes from './src/routes/User';

dotenv.config();

const port = process.env.PORT || "4040";
const router = express();

(() => {
  router.use(express.json());
  router.use(express.urlencoded({ extended: true }));

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
  router.use('/api/room', roomRoutes);
  router.use('/api/user', userRoutes);

  const server = http.createServer(router);

  router.get("/api/", (req: Request, res: Response) => {
    console.log(`[server]: control status get`);

    res.status(200).json({ status: "OK" });
  });

  server.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}/`);
  });
})();
