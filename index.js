const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ Mongo Error", err));

// Schema
const memberSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  dob: String,
  district: String,
  idNumber: String,
  membership: String,
  photoURL: String,
});

const Member = mongoose.model("Member", memberSchema);

// Routes
app.post("/api/members", async (req, res) => {
  try {
    const member = new Member(req.body);
    await member.save();
    res.status(201).json({ message: "Member saved" });
  } catch (err) {
    res.status(500).json({ error: "Failed to save member" });
  }
});

app.get("/api/members", async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch" });
  }
});

app.listen(port, () => console.log(`🚀 Server running on http://localhost:${port}`));
