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
docker build -t admiral/admiral_npm:latest .
```

via docker compose chaining:  
1) Start a mysql8 docker instance with a persistent volume for storage  
2) launch the wallet-api web client docker instance  
```
docker compose up --detach
```

While developing the application you will want to run the hot restart version rather than the docker version  
```
npm run startd
```

bash in for whatever reason
```
docker exec -it CONTAINER_ID /bin/sh
```

Destroy everything including db and start again (we may want a liquibase db destroy just for this bit really)  
``` 
docker compose down
docker volume rm admiral_dev_dev-datavolume
```


