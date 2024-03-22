import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
dotenv.config();
const port = process.env.PORT;
const url = process.env.MONGODB_URL;

mongoose.connect(url).then(db => {
    console.log("Connected to database!");
}).catch(err => {
    console.log(err);
});

const userSchema = new mongoose.Schema({
    _id: Number,
    title: String,
    content: String
});

const userModel = mongoose.model("notes", userSchema);

const whitelist = [{origin: "http://localhost:3000"}]

app.use(cors(whitelist));

app.get("/", async (req, res) => {
  console.log("Server triggered!");
  const allNotes = await userModel.find();
  res.send(allNotes);
});

//await userModel.insertMany(randomData);

//await userModel.deleteMany();

//const data = await userModel.find();
//console.log(data);



app.listen(port, () => {
    console.log(`Lisening to port: ${port}`);
});