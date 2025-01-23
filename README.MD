# ToolboxOTT Challenge

# Needed Tools
- Docker
- Docker compose
- npm
- node
 
## Project Structure
```
/project-root
├── backend
│   ├── package.json
│   ├── package-lock.json
│   ├── test
│   ├── src
│   │   └── index.js
│   ├── controllers
│   ├── routes
│   │   └── index.js
│   ├── services
│   ├── wrapper
│    frontend
|   |─── public
|   |       └── index.html
|   |─── src
|   |    └── App.js   
|   |    └── Index.js   
|   |──── components   
└── Dockerfile
└── docker-compose-yml
└── README.MD
└── .gitignore
``` 
## Backend
- Backend folder: General files needed to make backend work 
- src: contains the bussines logic of the project
- routes: here we can set up our routes give their name and version them
- controllers: contains the entrypoint of our enpoint,before do some processing we can return an error if something goes wrong (also we can configure middlewares).
- services: contain the bussines logic of the project
- wrapper: here we can wrapp 3rd party servieces (axios, orm, etc).

## Frontend
- public: contain the entrypoint of our app
- src: source code of the project (components, assets, api wrappers, etc)
- components: components of the app

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
docker-compose down       
docker-compose build --no-cache
docker-compose up
```

## Usage

- Backend is set up to run on localhost port 3000 for development
- Frontend is  set up to run on localhost port 3001 for development
- Docker container will run on localhost port 3000 for development

## Troubleshooting
If you have issues running app on Docker try
```
docker-compose down
docker-compose rm -f
docker system prune -f
```

Be careful if you have more containers into your machine these commands will delete them
## Testing
If you want to run tests of project just go to backend or frontend and run
```
npm run test
```
