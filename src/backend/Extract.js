const express = require("express");
const PORT = 3000;
const app = express();
const cors = require("cors");
const translatte = require("translatte");
const mongoose = require("mongoose");

const scrapeDataTheH = require("./TheHindu");
const scrapeDataHT = require("./HindustanTimes.js");
const scrapeDataIE = require("./IndianExpress.js");
const stockData = require("./StockPrices.js");
const Users = require("./Schema.js");

app.use(express.json());

app.use(cors());

mongoose
  .connect(
    "mongodb://pradeep:pradeep@ac-o1t8upk-shard-00-00.xlhw79w.mongodb.net:27017,ac-o1t8upk-shard-00-01.xlhw79w.mongodb.net:27017,ac-o1t8upk-shard-00-02.xlhw79w.mongodb.net:27017/?replicaSet=atlas-mqeotn-shard-0&ssl=true&authSource=admin"
  )
  .then((res) => console.log("connected"))
  .catch((err) => console.log(err));

//loging in
app.post("/login", async (req, res) => {
  const Userdata = req.body;
  const data = await Users.findOne({ email: Userdata.email });
  try {
    if (Userdata.password === data.password) {
      console.log("verifed");
      res.status(200).send({ success: true });
    } else {
      res.status(400).send({ success: false });
    }
  } catch (e) {
    console.log(e);
    res.status(404).send("bad request");
  }
});

//signing up
app.post("/signup", async (req, res) => {
  const data = req.body;
  try {
    const newUser = new Users({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
    });

    const savedUser = await newUser.save();
    console.log("User saved successfully:", savedUser);
  } catch (error) {
    console.error("Error saving user:", error);
  }
});

//addnotes
app.post("/addnotes", async (req, res) => {
  const { email, note, date } = req.body; // Assume date is optional
  console.log(note);
  try {
    if (!email || !note) {
      return res.status(400).json({ message: "Email and note are required" });
    }

    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(note, date);
    user.notes.push({ text: note, date: date }); // Push new note to the notes array
    await user.save();

    res.status(200).json({ message: "Note added successfully", user });
  } catch (error) {
    console.error("Error adding note:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//getnotes

app.post("/getnotes", async (req, res) => {
  console.log("at server fetching");
  const data = await Users.findOne({ email: req.body.email });
  if (data) {
    console.log(data.notes);
    res.send(data.notes);
    console.log(data, "data sent");
  } else {
    res.status(400).json({ message: "could not find data" });
  }
});

app.get("/", (req, res) => {
  console.log("hi man");
  res.send({
    data: "dhfhwds",
  });
});

app.get("/stockdata", async (req, res) => {
  const data = await stockData();
  res.send(data);
  console.log("stockserver");
});

app.post("/trans", async (req, res) => {
  console.log("trans");
  try {
    console.log(req.body);
    const resp = await translatte(req.body.text, { to: req.body.to });
    const data = resp.text;
    const arr = data.split(" ");
    console.log("Sending JSON response:", arr);
    res.json(arr); // Sending the array as JSON
  } catch (e) {
    console.log(e);
    res.status(500).send("Error translating text");
  }
});

app.get("/getdata", async (req, res) => {
  console.log("server side");
  const arrDataHT = [[], [], []];

  const arrDataIE = [[], [], []];

  const arrDataTheH = [[], [], []];
  const IEdata = await scrapeDataIE();
  console.log("data fetching at IE");
  const hinduData = await scrapeDataTheH();
  console.log("data fetching at hindu");
  const HTData = await scrapeDataHT();
  console.log("data fetching at HT");

  if (
    (HTData.length != HTData[0].length) !== 0 &&
    HTData[1].length !== 0 &&
    HTData[2].length !== 0
  ) {
    arrDataHT[0] = HTData[0];
    arrDataHT[1] = HTData[1];
    arrDataHT[2] = HTData[2];
  }
  if (
    hinduData.length != 0 &&
    hinduData[0].length !== 0 &&
    hinduData[1].length !== 0 &&
    hinduData[2].length !== 0
  ) {
    arrDataTheH[0] = hinduData[0];
    arrDataTheH[1] = hinduData[1];
    arrDataTheH[2] = hinduData[2];
  }
  if (
    IEdata.length != 0 &&
    IEdata[0].length !== 0 &&
    IEdata[1].length !== 0 &&
    IEdata[2].length !== 0
  ) {
    arrDataIE[0] = IEdata[0];
    arrDataIE[1] = IEdata[1];
    arrDataIE[2] = IEdata[2];
  }
  try {
    res.status(200).send({
      arrayTOI: arrDataHT,
      arrayIE: arrDataIE,
      arrayHin: arrDataTheH,
    });
    console.log("data sent");
  } catch (e) {
    res.send({
      status: 400,
      error: "data not fetched",
    });
  }
});

app.listen(PORT, () => {
  console.log("LISTENING PORT");
});
