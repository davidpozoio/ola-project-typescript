# Api Documentation

## Basic command

starting project first install **node_modules**

`pnpm install`

start project in dev mode

`pnpm run dev`

build the project to create a file in the folder called **dist/server.js**

`pnpm run build`

## Application

`GET http://localhost:8000/`

Return the index.html

## Api Route

`GET http://localhost:8000/api/v1`

## USERS

**get alls**
`GET http://localhost:8000/api/v1/users`

`GET http://localhost:8000/api/v1/users/notifications`

`POST http://localhost:8000/api/v1/users/toggle-access`

## AUTH

`GET http://localhost:8000/api/v1/login`

`GET http://localhost:8000/api/v1/signup`
