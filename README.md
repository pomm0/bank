# Mgruber sample project (React)

A react showcase app.
The visual part was not the main focus.
It uses [miragejs](https://miragejs.com/) to mock api-server.

Deployed on https://cv.mgruber.dev

---

## How to start

- Install npm dependencies: `npm install`
- Start app: `npm run start`
- Go to `http://localhost:3000`

## Inside docker

Even this app only uses one service I use `docker-compose`. I like the simplesness of just calling `docker-compose up -d`.

- Start docker-compose with `docker-compose up` or `docker-compose up -d` (deamon mode)
- Wait for server ready (it will install dependencies which may take a bit)
- Go to `http://localhost:3000`

## Run tests

- Install npm dependencies: `npm install`
- Start tests: `npm run test`

## Build

- Install npm dependencies: `npm install`
- Start build: `npm run build`

### TODOS:

- Add E2E testing
- Add translations (https://react.i18next.com/)
- Remove `data-testid` from production build (https://github.com/oliviertassinari/babel-plugin-react-remove-properties)
- Allow `today` as valid date for new bank transfer
