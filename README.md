# HiveMind Webpage

Social Network implemented as an Angular-generated Single-Page Application using an Express-based REST API

## Start-up process

Start-up is executed through Docker Compose:

1. In the __/backend__ directory, change the __.env.dummy__ into __.env__;
2. In the __.env__, add a value to __TOKEN_SECRET__; said value is a sequence of numbers and capitalized letters (e.g. 50M3_53CR37_70K3N);
3. Execute __docker compose up__ while the working directory is the same of this file; 

The website will be completely functional after the docker building process;

## Alternative Start-up

In the case that Docker Compose should not work for any reason, here is presented an alternative process to start the Web App:
1. Open two terminals, one in the __/backend__ directory, the other in the __/frontend__ directory
2. For each terminal, 
    1. Make sure Nodejs version is __20.9.0 or higher__
    2. Execute __npm install__ command
    3. Execute __npm audit fix__ command (if error comes up, skip step)
3. First, execute __npm start__ in the terminal with __/backend__ working directory
4. Finally, execute __npm start__ in the terminal with __/frontend__ working directory, as well

#

### In both cases, Webpage will be available at _http://localhost:4200/_