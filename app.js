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
// =========================================== 



//                ==== READ, WRITE, DUPLEX, TRANSFORM - !!! =====
// // // const zlib = require('node:zlib');




const express = require('express');
const fileService = require('./file.service')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

// const users = [
//   {
//   name: 'Oleh',
//   age: 20,
//   gender: 'male'
//   },
//   {
//     name: 'Katya',
//     age: 22,
//     gender: 'female'
//   },
//   {
//     name: 'Olha',
//     age: 24,
//     gender: 'female'
//   },
//   {
//     name: 'Oleh',
//     age: 25,
//     gender: 'male'
//   },
//   {
//     name: 'Katya',
//     age: 26,
//     gender: 'female'
//   },
//   {
//     name: 'Oleh',
//     age: 29,
//     gender: 'male'
//   },
//   {
//     name: 'Innokentiy',
//     age: 18,
//     gender: 'male'
//   },
//   {
//     name: 'Olena',
//     age: 44,
//     gender: 'female'
//   },
//   {
//     name: 'Cocos',
//     age: 79,
//     gender: 'female'
//   },
// ]

// app.get('/', (req, res) => {
// // // //  // console.log('Hello FROM /!')
// // //  // res.send('Hello FROM //!')
//  //  // res.send({
// //  //   message: 'Hello FROM ///'
// //  // })
// })

app.get('/users', async (req, res) => {
  const users = await fileService.readDB();
  res.json(users);
})

// app.get('/users/:userId', (req, res) => {
//   const {userId} = req.params;
//   // console.log(userId);
//
//   res.json(users[+userId]);
// })

app.post('/users', async (req, res) => {
  // console.log(req.body);
  // users.push(req.body);

  const {name, age} = req.body;


  if (!name) {
    return res.status(400).json('name is wrong');
  }

  if (!age || age < 10 || age > 100) {
    return res.status(400).json('age is wrong');
  }

  const users  = await fileService.readDB();
  const newUser = {
    id: users.length ? users[users.length -1].id + 1 : 1,
    name,
    age,
  }

  users.push(newUser);

  await fileService.writeBD(users);

  // let r;
  // if (req.body.age < 0 || r) {
  //   throw new Error('FDFSFSKDFJSDKFJKDS');
  // }

  res.status(201).json(newUser);
})

app.get('/users/:userId', async (req, res) => {
  const {  userId } = req.params;

  const users = await fileService.readDB();

 const user = users.find((user) => user.id === +userId);

  // users[+userId] = req.body;
  if (!user) {
    return res.status(422).json('user not found');
  }

  res.json(user);
  // res.status(200).json(user
  //     {
  //   message: 'User updated.',
  //   data: users[+userId]
  // })
})

app.patch('/users/:userId', async (req, res) => {
  const { userId } = req.params;
  const {name, age} = req.body;

  if (name && name.length < 5) {
    return res.status(400).json('name is wrong');
  }
  if (age && (age < 10 || age > 110)) {
    return res.status(400).json('age is wrong');
  }

  const users = await fileService.readDB();
  // const user = users.find((user) => user.id === +id);
  const user = users.find((user) => user.id === +userId);

  if (!user) {
    return res.status(422).json('user not found');
  }
  if (name) user.name = name;
  if (age) user.age = age;

  await fileService.writeBD(users);

  res.sendStatus(201).json(user);
  // res.status(204);
})

app.delete('/users/:userId', async (req, res) => {
  const { userId } = req.params;

  const users = await fileService.readDB();
  // const user = users.find((user) => user.id === +id);
  const index = users.findIndex((user) => user.id === +userId);

  if (index === -1) {
    return res.status(422).json('user not found');
  }

  users.splice(index, 1);
  await fileService.writeBD(users);

  res.sendStatus(204);
  // res.status(204);
})


const PORT = 3999;

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT} 😂😂`)
})
// =================================================================




//                          ==== CRUD ====
//          create/read/update/delete