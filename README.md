# admiral_wallet_api

A simple wallet api that connects to a backend database written in nodejs with express  
Uses the admiral_dev development environment

## Prerequisites

Tested on  
WSL 2  
`C:\> wsl -l -v)`    
Ubuntu 22.04 LTS  
`$ cat /etc/issue`   

Developed in VSCode, but the choice is yours  

## Getting Started

Assuming debian linux.  
First run:
```
mkdir ~/workspace
cd workspace
git clone git@github.com:fistralpro/admiral_dev.git
# follow instructions in readme
cd ~/workspace
git clone git@github.com:fistralpro/admiral_wallet_api.git
```  

Build the latest docker image (but don't publish it anywhere but locally)  
```
cd ./admiral_wallet_api
docker build -t admiral/admiral_npm:latest .
```

Now build the liquibase docker image (liquibase doesn't ship with a mysql driver)
```
docker build -f liquibase.Dockerfile -t liquibase/liquibase-mysql .
```

Now bring up our dev comtainer for the first time, connect to our mysql database and run the create database script for our wallet api (updates managed in liquibase)  
```
#ignore both warnings about MYSQL_USER and MYSQL_PASSWORD, and insecure passwords on the command line... this isn't production
docker compose -f ../admiral_dev/docker-compose.yml up --detach
# if you get an error on the next line, the mysql server may not be fully up, try again
docker exec --env-file env.dev -i dev_mysql mysql -u root -ppassword < createdb.sql
docker compose -f docker-compose.liquibase.yml up
```

Now start the environment via docker compose chaining:  
1) Start a mysql8 docker instance with a persistent volume for storage  (it may be up previously if you have just created the db)
2) launch the wallet-api web client docker instance  
```
docker compose up --detach
```

While developing the application you will want to run the hot restart version rather than the docker version - this uses the .env file for local variables.       
```
npm run startd 
```
This should run on port 30000 (port number upped so you can sleave your other containers running)

bash in for whatever reason
```
docker exec -it wallet_api /bin/sh
docker exec -it dev_mysql /bin/sh
```

Destroy everything including db and start again (we may want a liquibase db destroy just for this bit really)  
``` 
docker compose down
docker volume rm admiral_dev_dev-datavolume
```

## optional
install nvm
```
sudo apt install curl 
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash 
source ~/.bashrc   
nvm install node 
```