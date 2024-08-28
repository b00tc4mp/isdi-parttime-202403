## Api Execution

```sh
$ npm start
```
or 

```sh
$ npm run watch
```

## Instructions for Running MongoDB

These instructions explain how to start the MongoDB server and how to connect to the client (shell) to interact with the databases. 

First, ensure that MongoDB and MongoSH are downloaded, you can do so by navigating to: https://www.mongodb.com/try/download/community for MongoDB server (database),  and https://www.mongodb.com/try/download/shell for MongoDB client (interacting with MongoDB)


# Starting the MongoDB Server

Navigate to the directory where MongoDB is located:
```sh
$ cd /home/eddy-c/BooTC/mongodb-linux-x86_64-ubuntu2204-7.0.11
```
Start the MongoDB server by specifying the data directory (--dbpath):

```sh
$ ./bin/mongod --dbpath data
```
Note: Ensure that the data directory exists and is accessible. If it does not exist, you can create it with:

```sh
$ mkdir -p data
```
# Starting the MongoDB Client (MongoSH)

In a new terminal, navigate to the directory where MongoSH is located:

```bash
$ cd /home/eddy-c/BooTC/mongosh-2.2.10-linux-x64
```
Launch MongoSH to open the MongoDB shell:

```bash
$ ./bin/mongosh
```

# Testing the Server from the Client

Once connected, you can view the available databases by running:

```sh
$ show dbs
```
To view the collections within the test database, run:

```sh
$ use test
```
```sh
$ show collections
```
