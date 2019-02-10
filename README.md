# nodevote
Voting server with RESTful api.
Requires MYSQL to run.
Please restore database from backup before run!
## INSTALLATION
```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash #NVM install
nvm install node #Last node.js install
nvm use node 
npm install #Install packages from dependencies
```  
## RUN
```
node server.js
```  
## DATABASE FROM BACKUP
```
mysql -u root -p nodevote < nodevote.sql
```
## TESTING
POST request to http://localhost:3000/theme/. Will create a poll named "Do you like polls?". Name with more than 1024 symbols will return error.
```
curl -v -XPOST -H "Content-type: application/json" -d '{"name":"Do you like polls?"}' 'http://localhost:3000/theme/
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
