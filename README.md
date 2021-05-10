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

## Binaries

https://github.com/contributeless/mongo-oplog-viewer/releases

<div align="right">
  <b><a href="#index">↥ Back To Top</a></b>
</div>

## Useful links

- [Official MongoDB documentation](https://docs.mongodb.com/manual/core/replica-set-oplog/)
- [Medium article](https://atharva-inamdar.medium.com/understanding-mongodb-oplog-249f3996f528)
- [Hevo article](https://hevodata.com/learn/working-with-mongodb-oplog/)

<div align="right">
  <b><a href="#index">↥ Back To Top</a></b>
</div>

## License

Mongo oplog viewer is licensed under [MIT](https://github.com/contributeless/mongo-oplog-viewer/blob/master/LICENSE).

<div align="right">
  <b><a href="#index">↥ Back To Top</a></b>
</div>