//
// //             ====EVENTS=========
//
// // const events = require('node:events');
// //
// // const eventEmitter = new events();
// //
// // eventEmitter.on('click', (data) => {
// //     console.log(data);
// //     console.log('Click click click')
// // })
// //
// // eventEmitter.emit('click', {data: "Hello"});
// // eventEmitter.emit('click');
// // eventEmitter.emit('click');
// // eventEmitter.emit('click');
// // eventEmitter.emit('click');
// //
// //
// // console.log(eventEmitter.eventNames());
// //
// //
// // eventEmitter.once('clickAndDie', () => {
// //     console.log('Clicked and die');
// // })
// //
// // console.log(eventEmitter.eventNames());
// //
// //
// // eventEmitter.emit('clickAndDie');
// // eventEmitter.emit('clickAndDie');
// // eventEmitter.emit('clickAndDie');
// //
// //
// // console.log(eventEmitter.eventNames());
// //
// // =============================================
//
//
//
//
//
//
// //                  ====STREAMS======
//
// const fs = require('node:fs');
// const path = require('node:path');
//
//
// // const readStream = fs.createReadStream('text.txt', {highWaterMark: 128 * 1024});
// const readStream = fs.createReadStream('text3.txt', {highWaterMark: 128 * 1024});
// const writeStream = fs.createWriteStream('text2.txt');
//
//
// readStream.on('data', (chunk) => {
//     // console.log(chunk);
//     writeStream.write(chunk);
// })
//
//
// //readStream.pipe(writeStream);
// readStream
//     .on('error', () => {
//     // .on('error', (err) => {
//         // console.log('this is error');
//         // console.log(err);
//         readStream.destroy();
//         writeStream.end('error ON reading FILE');
//         // readStream.destroy();
//     })
//     .pipe(writeStream);
//
// =========================================== 4 streams:
//                ==== READ, WRITE, DUPLEX, TRANSFORM - !!! =====







                                                //SERVER FRAMEWORK
// // // const zlib = require('node:zlib');


const express = require('express');

import {Request, Response} from "express";

const app = express();

const users = [
  {
    name: 'Oleh',
  age: 20,
  gender: 'male'
  },
  {
    name: 'Katya',
    age: 22,
    gender: 'female'
  },
  {
    name: 'Olha',
    age: 24,
    gender: 'female'
  },
  {
    name: 'Oleh',
    age: 25,
    gender: 'male'
  },
  {
    name: 'Katya',
    age: 26,
    gender: 'female'
  },
  {
    name: 'Oleh',
    age: 29,
    gender: 'male'
  },
  {
    name: 'Innokentiy',
    age: 18,
    gender: 'male'
  },
  {
    name: 'Olena',
    age: 44,
    gender: 'female'
  },
  {
    name: 'Cocos',
    age: 79,
    gender: 'female'
  },
]

app.use(express.json());
app.use(express.urlencoded({extended: true}))


// app.get('/', (req, res) => {
// // // //  // console.log('Hello FROM /!')
// // //  // res.send('Hello FROM //!')
//  //  // res.send({
// //  //   message: 'Hello FROM ///'
// //  // })
// })

app.get('/users', (req: Request, res: Response) => {
  res.status(200).json(users);
})

app.get('/users/:userId', (req: Request, res: Response) => {
  const {userId} = req.params;
  console.log(userId);
  res.status(200).json(users[+userId]);
})

app.post('/users', (req: Request, res: Response) => {
  // console.log(req.body);
  users.push(req.body);

  res.status(201).json({
    message: 'User created!'
  })
})

app.put('/users/:userId', (req: Request, res: Response) => {
  const {  userId } = req.params;

  users[+userId] = req.body;

  res.status(200).json({
    message: 'User updated.',
    data: users[+userId]
  })
})

app.delete('/users/:userId', (req: Request, res: Response) => {
  const {userId} = req.params;

  users.splice(+userId, 1);

  res.status(200).json({
    message: 'User deleted.',
  })
})


const PORT = 3999;

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT} 😂😂`)
})
//
//
// =================================================================




//                          ==== CRUD ====