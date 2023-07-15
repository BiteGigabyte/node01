//
// //                              ====EVENTS=========
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
//                ==== READ, WRITE, DUPLEX, TRANSFORM - !!! ====

//SERVER FRAMEWORK
// // // const zlib = require('node:zlib');

import express, { Request, Response } from "express";
import * as mongoose from "mongoose";

import { configs } from "./configs/config";
import { User } from "./models/User.mode";
import { IUser } from "./types/user.type";
import { UserValidator } from "./validators";

// eslint-disable-next-line no-console
console.log(process.env);
// const express = require("express");

const app = express();

// const users = [
//   {
//     name: "Oleh",
//     age: 20,
//     gender: "male",
//   },
//   {
//     name: "Katya",
//     age: 22,
//     gender: "female",
//   },
//   {
//     name: "Olha",
//     age: 24,
//     gender: "female",
//   },
//   {
//     name: "Oleh",
//     age: 25,
//     gender: "male",
//   },
//   {
//     name: "Katya",
//     age: 26,
//     gender: "female",
//   },
//   {
//     name: "Oleh",
//     age: 29,
//     gender: "male",
//   },
//   {
//     name: "Innokentiy",
//     age: 18,
//     gender: "male",
//   },
//   {
//     name: "Olena",
//     age: 44,
//     gender: "female",
//   },
//   {
//     name: "Cocos",
//     age: 79,
//     gender: "female",
//   },
// ];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get('/', (req, res) => {
// // // //  // console.log('Hello FROM /!')
// // //  // res.send('Hello FROM //!')
//  //  // res.send({
// //  //   message: 'Hello FROM ///'
// //  // })
// })
app.get(
  "/users",
  async (req: Request, res: Response): Promise<Response<IUser[]>> => {
    try {
      const users = await User.find();
      // const users = await User.find().select('-password');

      return res.json(users);
    } catch (e) {
      console.log(e);
    }
  }
);

app.get(
  "/users/:id",
  async (req: Request, res: Response): Promise<Response<IUser>> => {
    try {
      const user = await User.findById(req.params.id);

      return res.json(user);
    } catch (e) {
      console.log(e);
    }
  }
);

app.post(
  "/users",
  async (req: Request, res: Response): Promise<Response<IUser>> => {
    // console.log(req.body);
    // users.push(req.body);

    try {
      const { error, value } = UserValidator.create.validate(req.body);

      if (error) {
        throw new Error(error.message);
      }

      const createdUser = await User.create(value);

      return res.status(201).json(createdUser);
    } catch (e) {
      console.log(e);
    }
  }
);

app.put(
  "/users/:userId",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId } = req.params;

      // const updatedUser = await User.updateOne({ _id: userId }, { ...req.body });
      const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        { ...req.body },
        { returnDocument: "after" }
      );

      res.status(200).json(updatedUser);
    } catch (e) {
      console.log(e);
    }
    // users[+userId] = req.body;
  }
);

app.delete(
  "/users/:userId",
  async (req: Request, res: Response): Promise<Response<void>> => {
    try {
      const { userId } = req.params;

      // const updatedUser = await User.updateOne({ _id: userId }, { ...req.body });
      await User.deleteOne({ _id: userId });

      return res.sendStatus(200);
    } catch (e) {
      console.log(e);
    }
  }
);

app.listen(configs.PORT, () => {
  mongoose.connect(configs.DB_URL);
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${configs.PORT} 😂😂`);
});
//
//
// =================================================================

//                          ==== CRUD ====
