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
