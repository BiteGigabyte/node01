"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const users = [
    {
        name: "Oleh",
        age: 20,
        gender: "male",
    },
    {
        name: "Katya",
        age: 22,
        gender: "female",
    },
    {
        name: "Olha",
        age: 24,
        gender: "female",
    },
    {
        name: "Oleh",
        age: 25,
        gender: "male",
    },
    {
        name: "Katya",
        age: 26,
        gender: "female",
    },
    {
        name: "Oleh",
        age: 29,
        gender: "male",
    },
    {
        name: "Innokentiy",
        age: 18,
        gender: "male",
    },
    {
        name: "Olena",
        age: 44,
        gender: "female",
    },
    {
        name: "Cocos",
        age: 79,
        gender: "female",
    },
];
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/users", (req, res) => {
    res.status(200).json(users);
});
app.get("/users/:userId", (req, res) => {
    const { userId } = req.params;
    console.log(userId);
    res.status(200).json(users[+userId]);
});
app.post("/users", (req, res) => {
    users.push(req.body);
    res.status(201).json({
        message: "User created!",
    });
});
app.put("/users/:userId", (req, res) => {
    const { userId } = req.params;
    users[+userId] = req.body;
    res.status(200).json({
        message: "User updated.",
        data: users[+userId],
    });
});
app.delete("/users/:userId", (req, res) => {
    const { userId } = req.params;
    users.splice(+userId, 1);
    res.status(200).json({
        message: "User deleted.",
    });
});
const PORT = 3999;
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT} 😂😂`);
});
