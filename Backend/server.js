import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
dotenv.config();
const port = process.env.PORT;
const url = process.env.MONGODB_URL;

// app.get("/", (req, res) => {
//     res.send("<h1> Successfully Hosted </h1>");
//     console.log("Successfully Hosted");
// });

mongoose.connect(url).then(db => {
    console.log("Successfully connected to database!");
}).catch(err => {
    console.log(err);
});

const userSchema = new mongoose.Schema({
    _id: Number,
    title: String,
    content: String
});

const userModel = mongoose.model("notes", userSchema);

const randomData = [
    {
        _id: 1,
        title: "Delegation",
        content:
          "Q. How many programmers does it take to change a light bulb? A. None – It’s a hardware problem"
      },
      {
        _id: 2,
        title: "Loops",
        content:
          "How to keep a programmer in the shower forever. Show him the shampoo bottle instructions: Lather. Rinse. Repeat."
      },
      {
        _id: 3,
        title: "Arrays",
        content:
          "Q. Why did the programmer quit his job? A. Because he didn't get arrays."
      },
      {
        _id: 4,
        title: "Hardware vs. Software",
        content:
          "What's the difference between hardware and software? You can hit your hardware with a hammer, but you can only curse at your software."
      }
    ];

await userModel.insertMany(randomData);

//await userModel.deleteMany();

const data = await userModel.find();
//console.log(data);



app.listen(port, () => {
    console.log(`Lisening to port: ${port}`);
});