<h1 align="center">
    <br>
    <img src="/assets/logo.png?raw=true" alt="Mongo oplog viewer"/>
    <br>
</h1>

# Mongo oplog viewer - [Latest release](https://github.com/contributeless/mongo-oplog-viewer/releases)

## Motivation

I always found myself spending too much time debugging data loss cases using MongoDB. Whenever I need to view what happened to my data, I had to use  robomongo/robo3t or something else to view **mongo/local/oplog.rs** collection and build complex queries to get the actions that happened in my database.

So as a developer, why not solve it the way that fits better with what I am good at?

## Index

<ul>
<li><a href="#what-is-mongodb-replica-set-oplog">What is MongoDb Replica Set Oplog</a></li>
<li><a href="#get-started">Get Started</a></li>
<li><a href="#features">Features</a></li>
<li><a href="#docker-support">Docker support</a></li>
<li><a href="#limitations">Limitations</a></li>
<li><a href="#tech-stack">Tech Stack</a></li>
<li><a href="#binaries">Binaries</a></li>
<li><a href="#useful-links">Useful links</a></li>
<li><a href="#license">License</a></li>
</ul>

## What is MongoDb Replica Set Oplog

The **oplog (operations log)** is a special capped collection that keeps a rolling record of all operations that modify the data stored in your databases.

Official documentation for [Replica Set Oplog](https://docs.mongodb.com/manual/core/replica-set-oplog/ "Replica Set Oplog").

<div align="right">
  <b><a href="#index">↥ Back To Top</a></b>
</div>

## Get Started

Here is a light **[demo](https://mongo-oplog-viewer.herokuapp.com/)**. The app is deployed on [heroku](https://dashboard.heroku.com/) and uses a free [Mongo Atlas](https://www.mongodb.com/cloud/atlas) instance. It can be "a bit" slow due to performance limitations of the free services.

The best way to understand it is to try it. Please download the [executable](https://github.com/contributeless/mongo-oplog-viewer/releases) for your operating system and try the application with local version of MongoDB.

<p align="center">
    <img src="/assets/binaries.png?raw=true" alt="Binaries"/>
</p>

<div align="right">
  <b><a href="#index">↥ Back To Top</a></b>
</div>

## Features

- Search for data changes in database collections
<p align="center" width="100%">
    <img src="/assets/search.gif?raw=true" alt="Search"/>
</p>

- Filter by Record id
<p align="center" width="100%">
    <img src="/assets/id_filtering.gif?raw=true" alt="Id filtering"/>
</p>

- Filter by Min/Max date of changes
<p align="center" width="100%">
    <img src="/assets/date_filtering.gif?raw=true" alt="Date filtering"/>
</p>

- Favourite filters
<p align="center" width="100%">
    <img src="/assets/favourite_filters.gif?raw=true" alt="Favourite filters"/>
</p>

<div align="right">
  <b><a href="#index">↥ Back To Top</a></b>
</div>

## Docker support
The app is also available on [DockerHub](https://hub.docker.com/repository/docker/contributeless/mongo-oplog-viewer)

Use the following command to run the image locally:

```
docker run -p 8080:80 contributeless/mongo-oplog-viewer:v0.0.3
```

<div align="right">
  <b><a href="#index">↥ Back To Top</a></b>
</div>

## Limitations

- Oplog.rs collection is only available for MongoDB instances running in ReplicaSet mode. So it will not be available for standalone MongoDB instances. If you want to use the oplog viewer in this case, see [How to setup an oplog on a single MongoDB instance](https://tuttlem.github.io/2014/06/13/how-to-setup-an-oplog-on-a-single-mongodb-instance.html)
- The records in oplog.rs collection can be removed by the MongoDB instance. According to [documentation](https://docs.mongodb.com/manual/core/replica-set-oplog/#minimum-oplog-retention-period):
>  The mongod only removes an oplog entry if:<br/>
>  1.The oplog has reached the **maximum configured size**, and<br/>
>  2.The oplog entry is **older than the configured number of hours** based on the host system clock.<br/>
> By default MongoDB does not set a minimum oplog retention period and automatically truncates the oplog starting with the oldest entries to maintain the configured maximum oplog size.

<div align="right">
  <b><a href="#index">↥ Back To Top</a></b>
</div>

## Tech Stack

- [React.js](https://github.com/facebook/react) - JavaScript library for building user interfaces.
- [Unstated](https://github.com/jamiebuilds/unstated) - State management library.
- [Moment.js](https://github.com/moment/moment) - A JavaScript date library for parsing, validating, manipulating, and formatting dates.
- [EventEmitter3](https://github.com/primus/eventemitter3) - High performance EventEmitter.
- [React-Toastify](https://github.com/fkhadra/react-toastify) - React-Toastify allows you to add notifications to your app with ease.
- [Reactjs-popup](https://github.com/yjose/reactjs-popup) - Simple react popup component that helps you create simple and complex Modals, tooltips, and Menus for your next React App.
- [react-json-view](https://github.com/mac-s-g/react-json-view) - RJV is a React component for displaying and editing javascript arrays and JSON objects.
- [react-datetime](https://github.com/arqex/react-datetime) - A date and time picker in the same React.js component.
- [express](https://github.com/expressjs/express) - Fast, unopinionated, minimalist web framework for node.
- [MongoDB NodeJS Driver](https://github.com/mongodb/node-mongodb-native) - The official MongoDB driver for Node.js.
- [TypeScript](https://github.com/microsoft/TypeScript) - TypeScript is a language for application-scale JavaScript.
- [winston@3](https://github.com/winstonjs/winston) - Simple and universal logging library with support for multiple transports.
- [cors](https://github.com/expressjs/cors) - CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
- [nodejs](https://github.com/nodejs/node) - Node.js is an open-source, cross-platform, JavaScript runtime environment.

<div align="right">
  <b><a href="#index">↥ Back To Top</a></b>
</div>

## Binaries

https://github.com/contributeless/mongo-oplog-viewer/releases

<div align="right">
  <b><a href="#index">↥ Back To Top</a></b>
</div>

## Useful links

- [Official MongoDB documentation: Replica Set Oplog](https://docs.mongodb.com/manual/core/replica-set-oplog/)
- [Medium article: Understanding MongoDB Oplog](https://atharva-inamdar.medium.com/understanding-mongodb-oplog-249f3996f528)
- [Hevo article: Working with MongoDB Oplog: A Comprehensive Guide](https://hevodata.com/learn/working-with-mongodb-oplog/)

<div align="right">
  <b><a href="#index">↥ Back To Top</a></b>
</div>

## License

Mongo oplog viewer is licensed under [MIT](https://github.com/contributeless/mongo-oplog-viewer/blob/master/LICENSE).

<div align="right">
  <b><a href="#index">↥ Back To Top</a></b>
</div>