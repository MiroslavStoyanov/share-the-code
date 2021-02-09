### Share The Code
## About
This application has the aim to provide users with a platform where they can share their own, browse and like existing code snippets submitted by others.

## Getting Started

1. Make sure you have installed:
    * [Node.js & npm](https://github.com/creationix/nvm/blob/master/README.md)
    * [Vue CLI](https://cli.vuejs.org/)
    * [MongoDb](https://www.mongodb.com/) (needed for the application. Once you installed MongoDb, create a database called `share-the-code-db`. If you forget to install it, MongoDb should automatically create one if it's not existing.)
    * [Postman](https://www.postman.com/) (not required but needed if you only wish to send requests to the server)

2. Install dependencies. Make sure you go in both `/server` and `/client` folders independetly and run:

   ```bash
   npm install
   ```
   Or just run the `npm dev` script. This will automatically startup the process. The server should be accessible on `localhost:3000`.

3. Start both services. You need to start the Node server first. Go to `/server` and run:
 
   ```
   node ./bin/www
   ```
   This will start the Express server on port 3000. Once this is up and running, it's time for the UI. Go to `/client` and run: 

   ```
   vue-cli-service serve
   ```
   This will lint the application to check for any pending errors and start it on port 8080 if all goes fine. YOu can also run the `npm serve` script. 
   You can access the application locally on `localhost:8080`.