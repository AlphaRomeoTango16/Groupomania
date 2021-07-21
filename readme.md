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

Launch the MySQL shell by entering:
```
$ mysql -u username -p
```
*Enter the root password when prompted. The command prompt should change to show that you’re working in MySQL.*

Create a new database by entering the following:
```
$ CREATE DATABASE groupomania;
```

Exit the MySQL shell and enter the following command to import the dump file:
```
$ mysql -u username -p groupomania < GroupomaniaDB.sql
```
*You’ll only see a response if there are errors. A successful import won’t display any comments on the screen.*

To check the database, log back into the MySQL shell:
```
$ mysql –u username –p
```

To load the database, enter:
```
$ USE groupomania
```
---
### 3/ INSTALL THE DATABASE
Configure the .env file in the backend folder with your settings (it must remain in the backend folder).
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