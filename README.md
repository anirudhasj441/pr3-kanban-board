# Kanban board

This is a mini project, i try to build for exploring react capabilities.

In this project user can create multiple project and each project has one board consists of three status column [Todo, In progress, completed],

It will have drag and drop compatibility, to reorder tasks and change status.

I had work with electron js and I want to focus only on react now, So I planned to crate a desktop application using electron js instead of web app, so i don't worry about db, backend server and all.

## Demo

![demo](./docs/demo.gif)

## Tech Stack:

1. React
2. React Router
3. Vite
4. Tailwindcss
5. Radix ui components
6. Electron

## Steps to run

1. Install all dependencies

```bash
$ npm install
```

2. start in dev mode

```bash
$ npm start
```

## Deployment

To create build for linux(ubuntu)

```bash
$ npm run build:linux
```

It will create .deb file in ./dist/electron folder, you can install app by running following command

```bash
$ sudo dpkg -i <path to deb file>.deb
```

To create build for windows

```bash
$ npm run build:win
```

It will create nsis installer setup file which can be easily install.
