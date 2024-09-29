# Farm-Hub

An awesome app for putting in contact sellers & buyers of farming products mostly in rural areas. Platform developed with React with the main objective of putting in touch sellers and buyers of farm products. The app allows user to search products withing a 50km radious.

![](https://media.giphy.com/media/L0N18KIcj6Q1k1qawG/giphy.gif?cid=790b7611to347bowg1zej1c49sayiiv15oc2ld0f9xa767j3&ep=v1_gifs_search&rid=giphy.gif&ct=g)

## Usage

Once the server and frontend are running, you can access the application at http://localhost:8080. Here, you can:

- Create Ads: Post new product ads with detailed information.
- Manage Ads: Edit and update your existing ads.
- Delete Ads: Remove ads you no longer wish to display.
- Search for Products: Search for products by name and within a 50km radius.
- View Nearby Ads: See product ads within a 50km radius of your location.
- Add Comments: Engage with product ads by adding comments.
- Manage Comments: Edit or delete your own comments on ads.
- View Locations on a Map: See the approximate location of a product ad on an interactive map.

## Technologies used

**Frontend:**

- **React** - A JavaScript library for building user interfaces.
- **Vite** - A fast development build tool for frontend projects.
- **TailwindCSS** - A utility-first CSS framework that enables responsive design.
- **Leaflet** - An open-source JavaScript library for interactive maps.
- **React-Leaflet** - A React wrapper for Leaflet that allows developers to use Leaflet's mapping features in a React application.

**Backend:**

- **Node.js** - A JavaScript runtime environment that executes JavaScript code server-side.
- **Express** - A web framework for Node.js.
- **MongoDB** - A NoSQL database designed for flexible, high-performance data storage
- **Mongoose** - An Object Data Modeling (ODM) library for MongoDB.

**Testing:**

- **Mocha** - A JavaScript test framework that runs tests for Node.js and the browser.
- **Chai** - An assertion library for JavaScript.

## Prerequisites

- Node.js (version 14 or higher)
- MongoDB (running and accessible)

## Instructions

- Clone the repository

- App Installation(Install frontend dependencies)

```sh
$ cd Farm-Hub/Frontend
$ npm install
```

-Api Installation (Install backend dependencies)

```sh
$ cd Farm-Hub/Backend
$ npm install
```

- Set up environment variables:

Create a .env file in the project's root directory with the following variables:

PORT=8080
MONGODB_URL=mongodb://localhost:27017/your-database

- Start the server:

```sh
$ npm start
```

or

```sh
$ npm run watch
```

- Start the frontend:

```sh
$ npm start
```

or

```sh
$ npm run dev
```

## Instructions for Running MongoDB

These instructions explain how to start the MongoDB server and how to connect to the client (shell) to interact with the databases.

First, ensure that MongoDB and MongoSH are downloaded, you can do so by navigating to: https://www.mongodb.com/try/download/community for MongoDB server (database), and https://www.mongodb.com/try/download/shell for MongoDB client (interacting with MongoDB)

### Starting the MongoDB Server

Navigate to the directory where MongoDB is located:

```sh
$ cd <path-to-mongodb>
```

Start the MongoDB server by specifying the data directory (--dbpath):

```sh
$ ./bin/mongod --dbpath <path-to-data-directory>
```

Note: Ensure that the data directory exists and is accessible. If it does not exist, you can create it with:

```sh
$ mkdir -p data <path-to-data-directory>
```

### Starting the MongoDB Client (MongoSH)

In a new terminal, navigate to the directory where MongoSH is located:

```bash
$ cd <path-to-mongosh>
```

Launch MongoSH to open the MongoDB shell:

```bash
$ ./bin/mongosh
```

### Testing the Server from the Client

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

## Project Structure

```
Farm-Hub/
├──── Backend/
│     ├──── .env
│     ├──── .gitignore
│     ├──── README.md
│     ├──── coverage/
│     ├──── data/
│     ├──── handlers/
│     ├──── index.js
│     ├──── logic/
│     ├──── test/
│     └──── util/
├──── Frontend/
│     ├──── .env
│     ├──── .gitignore
│     ├──── README.md
│     ├──── index.html
│     ├──── postcss.config.js
│     ├──── public/
│     ├──── src/
│     ├──── tailwind.config.js
│     └──── vite.config.js
├──── com/
│     ├──── errors.js
│     ├──── index.js
│     ├──── package.json
│     └──── validate.js
├──── doc/
│     └──── README.md
├──── jsconfig.json
```

## Testing

- The application's backend is tested with over 95% coverage using Mocha and Chai.

To run the tests:

```sh
$ cd api
npm run test
```

or

```sh
npm run test-coverage
```
