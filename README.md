# GoTogether_backend

## End points

### Users (/api/user)

POST<br />
`/` - register new user<br />
`/login` - login user<br />
<br />
GET<br />
`/` - get all users<br />
`/:id` - get one user by id<br />
<br />
DELETE<br />
`/:id` - delete user<br />
<br />

### Rooms (/api/room/)

POST<br />
`/` - create room<br />
<br />
GET<br />
`/filter/hosted` - get rooms by host id<br />
`/filter/requested` - get all requested rooms<br />
`/filter/accepted` - get all accepted rooms<br />
`/` - get all rooms<br />
`/my-rooms` - get all your rooms (hosted, joined, requested)<br />
`/:roomId` - get room by id<br />
<br />
DELETE<br />
`/:roomId` - delete room<br />
`/delete/users` - delete user from accepted users list<br />
`/delete/requested` - delete user from requested users list<br />
`/delete/hosts` - delete user from hosts list<br />
<br />
PATCH<br />
`/join-user` - request user to room<br />
`/accept-user` - accept user request<br />
`/grant-host`  - grant host role to user<br />
