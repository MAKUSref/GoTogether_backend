import Room, { IRoom } from "../model/Room";
import { IUser } from "../model/User";
import Redis from "../redis/Redis";

const KEY = "rooms";

class RoomRepository {
  redis = new Redis<IRoom>(KEY);

  async addRoom(room: IRoom): Promise<boolean> {
    return await this.redis.addValue(room);
  }

  async getAll(): Promise<IRoom[]> {
    const rooms = await this.redis.getValues();
    return rooms;
  }

  async getBy(
    callback: (room: IRoom, index: number) => boolean
  ): Promise<Room[]> {
    const rooms = await this.getAll();
    return rooms.filter((room: IRoom, index: number) => callback(room, index));
  }

  async getByRoomId(id: string): Promise<IRoom[]> {
    return await this.getBy((room: IRoom) => room.id === id);
  }

  async getByRoomPin(pin: number): Promise<IRoom[]> {
    return await this.getBy((room: IRoom) => room.pin === pin);
  }

  async getByHostId(hostId: string): Promise<IRoom[]> {
    return await this.getBy((room: IRoom) => room.hosts.includes(hostId));
  }

  async getByRequestedUserId(userId: string): Promise<IRoom[]> {
    return await this.getBy((room: IRoom) =>
      room.requestingUsers.includes(userId)
    );
  }

  async getByAcceptedUserId(userId: string): Promise<IRoom[]> {
    return await this.getBy((room: IRoom) => room.users.includes(userId));
  }

  async deleteRoom(id: string) {
    const rooms = (await this.getAll()).filter((room: IRoom) => room.id !== id);
    return await this.redis.setValues(rooms);
  }

  async deleteFromUserList(roomId: string, userId: string) {
    const rooms = await this.getAll();

    const updatedRoom = rooms.map((room) => {
      if (room.id === roomId) {
        room.users = room.users.filter((id) => id !== userId);
      }

      return room;
    });

    return await this.redis.setValues(updatedRoom);
  }

  async deleteFromHostsList(roomId: string, userId: string) {
    const rooms = await this.getAll();

    const updatedRoom = rooms.map((room) => {
      if (room.id === roomId) {
        room.hosts = room.hosts.filter((id) => id !== userId);
      }

      return room;
    });

    return await this.redis.setValues(updatedRoom);
  }

  async deleteFromRequestedList(roomId: string, userId: string) {
    const rooms = await this.getAll();

    const updatedRoom = rooms.map((room) => {
      if (room.id === roomId) {
        room.requestingUsers = room.requestingUsers.filter(
          (id) => id !== userId
        );
      }

      return room;
    });

    return await this.redis.setValues(updatedRoom);
  }

  async requestUserToRoom(pin: number, userId: string) {
    const rooms = await this.getAll();

    const updatedRoom = rooms.map((room) => {
      if (room.pin === pin) {
        room.requestingUsers.push(userId);
      }

      return room;
    });

    return await this.redis.setValues(updatedRoom);
  }

  async acceptUserRequest(roomId: string, userId: string) {
    const rooms = await this.getAll();

    const updatedRoom = rooms.map((room) => {
      if (room.id === roomId) {
        room.requestingUsers = room.requestingUsers.filter(
          (id) => id !== userId
        );
        room.users.push(userId);
      }

      return room;
    });

    return await this.redis.setValues(updatedRoom);
  }

  async grantHost(roomId: string, userId: string) {
    const rooms = await this.getAll();

    const updatedRoom = rooms.map((room) => {
      if (room.id === roomId) {
        room.users = room.users.filter(
          (id) => id !== userId
        );
        room.hosts.push(userId);
      }

      return room;
    });

    return await this.redis.setValues(updatedRoom);
  }
  async leaveRoom(roomId: string, requestingUsers: string) {
    const rooms = await this.getAll();

    const updatedRoom = rooms.map((room) => {
      if (room.id === roomId) {
        room.hosts = room.users.filter(
          (id) => id !== requestingUsers
        );
        room.users = room.users.filter(
          (id) => id !== requestingUsers
        );
        room.requestingUsers = room.users.filter(
          (id) => id !== requestingUsers
        );
      }

      return room;
    });

    return await this.redis.setValues(updatedRoom);
  }
}

export default RoomRepository;
