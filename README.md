# nodevote
Voting server with RESTful api.
Requires MYSQL to run.
Please restore database from backup before run!
## INSTALLATION

#### NVM install
```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash #NVM install
```
#### Last node.js install
```
nvm install node
```
#### Select last node version
```
nvm use node
```
#### Install packages from dependencies
```
npm install
```  
## RUN
```
node server.js
```  
## DATABASE FROM BACKUP
```
mysql>CREATE DATABASE nodevote;
mysql>CREATE USER 'nodevoteuser'@'localhost' IDENTIFIED BY 'password';
mysql>GRANT ALL PRIVILEGES ON nodevote.* TO 'nodevoteuser'@'localhost';

mysql -u nodevoteuser -p nodevote < nodevote.sql
```
## TESTING
POST request to http://localhost:3000/theme/. Will create a poll named "Do you like polls?". Name with more than 1024 symbols will return error.
```
curl -v -XPOST -H "Content-type: application/json" -d '{"name":"Do you like polls?"}' 'http://localhost:3000/theme/'
```
GET request to http://localhost:3000/theme/1. Will get info about poll with themeId 1.
```
curl -v -XGET 'http://localhost:3000/theme/1'
```
POST request to http://localhost:3000/theme/1/yes Will add vote 'yes' into poll with themeId 1.
```
curl -v -XPOST 'http://localhost:3000/theme/1/yes'
```
POST request to http://localhost:3000/theme/1/no Will add vote 'no' into poll with themeId 1.
```
curl -v -XPOST 'http://localhost:3000/theme/1/no'
```
