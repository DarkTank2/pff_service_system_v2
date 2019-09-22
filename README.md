# Service System v2.0
The service-system for the 36er-ball redesigned in VUE with VUETIFY.

## Steps to run the project
### Requirements
* Latest Node.js-version installed
* GIT installed
* MariaDB installed
### Setup
1. Open a terminal and change the directory to the desired one
2. Clone the repository

`git clone git@github.com:DarkTank2/pff_service_system_v2.git` (SSH)

`git clone https://github.com/DarkTank2/pff_service_system_v2.git` (HTTPS)

3. Change the directory to on of the subfolders **backend**, **frontend** or **mockrouter** and type `npm install`

4. Repeat step three for the other two subfolder

### The mockrouter
This module acts as a layer between the user and the server. It is only used in development, not in production. It 
redirects backend-calls to the right source, since we are using the VUE-CLI-3.
* change the directory to the mockrouter
* type `node index.js` to start the mockrouter

### The backend
* change the directory to the backend
* create a file called **credentials.json**. It's content must be:
```
{
  "username": <the username to connect to the database>,
  "password": <the password for the respective user>
}
```
* type `node index.js` in a terminal at this location to start the backend

### The frontend
* change the directory to the frontend
* type `npm run serve` to start the frontend, this might take a while at first
***
**All of the three modules must run and must run on different terminals to work.**
