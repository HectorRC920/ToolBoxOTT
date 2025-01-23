# ToolboxOTT Challenge

# Needed Tools
- Docker
- Docker compose
- npm
- node
## Installation

Use the package manager [npm-node](https://nodejs.org/en/download) to install this project.

```bash
cd backend
npm install
cd ..
cd frontend
npm install
npm run build
```
if you want to develop new features
```bash
on frontend or backend
npm run dev
```
if you want to run into docker container (not dev available yet)
```bash
from the root of the project
docker-compose build --no-cache
```

## Usage

Backend is set up to run on localhost port 3000

## Troubleshooting
If you have issues running app on Docker try
```
docker-compose down                                                                                                  
docker-compose build --no-cache
docker-compose up
```
Be careful if you have more containers into your machine these commands will delete them
