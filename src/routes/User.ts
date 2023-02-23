import express from "express";
import * as controller from '../controllers/User';

const router = express.Router();

router.post('/', controller.createUser); // register new user
router.post('/login', controller.loginUser); // login user
router.get('/', controller.readUser); // get all users
router.get('/:id', controller.readSingleUser); // get one user by id
router.delete('/:id', controller.deleteUser); // delete user
router.patch('/coords', controller.updateCoords); // update user coords

export default router;
