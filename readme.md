# GROUPOMANIA
Groupomania is a social media application dedicated to the employees of the company Groupomania.
## INSTALL
### 1/ CLONE THE REPO 
Clone the repo in the directory of your choice.
```
$ git clone https://github.com/AlphaRomeoTango16/Groupomania.git yourDirectory
```
---
### 2/ INSTALL THE DATABASE
Install the database with MySQL.
```
$ mysql -u username -p groupomania < GroupomaniaDB.sql
```
---
### 3/ INSTALL THE DATABASE
Configure the .env file in the backend folder with your settings.
```
DB_USER="your user name"
DB_PASS="your password"
DB_HOST=localhost
DB_DATABASE=groupomania
```
---
### 4/ LAUNCH THE SERVER
Change the directory to backend and launch the server with nodeJS.
```
$ cd backend
$ node server
```
---
### 5/ LAUNCH THE APP
Open another terminal, change the directory to frontend and launch the app with Vue CLI.
```
$ cd frontend
$ npm run serve
```