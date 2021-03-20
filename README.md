# Express Starter

This starter repo will be used for building applications using React, Material-UI, React-Router, Node, & Express.js.

## Getting started

The project is broken down into a client and server folder.

### Server Scripts

- `npm run dev` - runs nodemon development environment for server
- `npm run debug` - runs nodemon with a node inspect debugger
- `npm run db` - runs database in docker container

### Client Scripts

- `npm start` - runs client app, localhost:3000
- `npm run build` - builds client app for deployment

### Get up and running

- Install everything:
   1. In `./server`, run `npm install`
   2. In `./client`, run `npm install`
- Start DB & Server:
   1. In `./server`, run `npm run db`
   2. Open up another terminal in `./server` and run `npm run dev`
- Start Client Dev Server:
   - In `./client`, run `npm run start`