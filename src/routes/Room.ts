import express from "express";
import * as controller from '../controllers/Room';

const router = express.Router();

router.post('/', controller.createRoom); // create room

router.get('/filter/hosted', controller.readHostedRooms); // get rooms by host id
router.get('/filter/requested', controller.readRequestedRooms); // get all requested rooms
router.get('/filter/accepted', controller.readAcceptedRooms); // get all accepted rooms
router.get('/', controller.readRoom); // get all rooms
router.get('/my-rooms', controller.readProfileRooms); // get all your rooms (hosted, joined, requested)
router.get('/:roomId', controller.readSingleRoom); // get room by id

router.delete('/:roomId', controller.deleteRoom); // delete room
router.delete('/delete/users', controller.deleteFromUsers) // delete user from accepted users list
router.delete('/delete/requested', controller.deleteFromRequested) // delete user from requested users list
router.delete('/delete/hosts', controller.deleteFromHosts) // delete user from hosts list

router.patch('/join-user', controller.requestUserToJoin); // request user to room
router.patch('/accept-user', controller.acceptRequest); // accept user request
router.patch('/grant-host', () => {}); // grant host role to user

export default router;
