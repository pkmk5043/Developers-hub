# Developers Hub (MERN)

This repository contains a MERN application with separate Backend (Node/Express/MongoDB) and Frontend (React) projects.

## Structure

- `Developershub_BE` — Express server, MongoDB models, middleware
- `Developershub_FE/client` — React application (Create React App)

## Prerequisites

- Node.js 18+ and npm
- MongoDB (local or Atlas connection string)

## Setup

1) Install dependencies

```bash
cd Developershub_BE && npm install
cd ../Developershub_FE/client && npm install
```

2) Configure environment

- Create `Developershub_BE/.env` and set your variables (example):

```bash
MONGODB_URI=mongodb://localhost:27017/developershub
JWT_SECRET=replace_with_strong_secret
PORT=5000
```

## Running

- Backend (from `Developershub_BE`):

```bash
npm run dev    # with nodemon
# or
npm start      # node server
```

- Frontend (from `Developershub_FE/client`):

```bash
npm start
```

If you prefer a single command runner, you can create a root script using `concurrently`, but with the current layout run each service from its own directory as above.

## GitHub Upload

This repo is prepared with proper `.gitignore` files. To publish:

```bash
git init
git branch -M main
git add .
git commit -m "chore: initialize MERN repo with gitignore and docs"
git remote add origin <your_repo_url>
git push -u origin main
```

## Notes

- The backend `client` npm script points to `client/` inside the backend, but the frontend lives in `Developershub_FE/client`. Use the commands above to run each service separately.