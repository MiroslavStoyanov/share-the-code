## About
This application has the aim to provide users with a platform where they share code snippets.

## Getting Started

1. Make sure you have installed:
    * [Node.js & npm](https://github.com/creationix/nvm/blob/master/README.md)
    * [Vue CLI](https://cli.vuejs.org/)
    * [MongoDb](https://www.mongodb.com/) (needed for the application. Once you installed MongoDb, create a database called `share-the-code-db`.)
    * [Postman](https://www.postman.com/) (not required but needed if you only wish to test the server requests)

2. Install dependencies. Make sure you go in both `/server` and `/client` folders independetly and run:

    ```bash
    npm install
    ```

3. Start both services. You need to start the Node server first. Go to `/server` and run:
 
 ```
 node ./bin/www
 ```
This will start the Express server on port 3000. Once this is up and running, it's time for the UI. Go to `/client` and run: 

```
vue-cli-service serve
```
This will lint the application for any pending errors and start it on port 8080. You can access the application locally on `localhost:8080`.