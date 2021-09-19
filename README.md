# node_express_sequelize
## A simple node application using express and sequelize ORM
This is nodejs basic app developed using nodejs mysql and sequelize ORM to get ride of database and table creation on server

## Setup dependencies

 ### Prerequisites
    - Node
    - Mysql
 ### Getting the configuration ready

Copy the .env.example file at the same location and save as .env using below command

    npm run copy:env
        
##### Update environment variable values accordingly

Create mysql database and go navigate to /src/server/congif directory and set your database credentials according to environmnet in config.json file

#### Install dependencies
    npm install
    
Run migrations to create tables under recently created database

    npm run migrate
    
After successfully executed migration start server using

    npm run start

#### Voila.. now your is running on port 3000