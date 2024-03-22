import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
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
  const allNotes = await userModel.find();
  res.send(allNotes);
});

app.post("/", async (req, res) => {
    const newNote = req.body;
    await userModel.insertMany(newNote);
    res.redirect("/");
});

app.delete("/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    await userModel.deleteOne({_id: id});
})


app.listen(port, () => {
    console.log(`Lisening to port: ${port}`);
});