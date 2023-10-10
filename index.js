const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const { MongoClient } = require("mongodb");
const uri = "mongodb://task_username:task2@mongodb:27017";
const database = "database";

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

async function connectToDatabase() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(database);
  return { client, db };
}

// Create users
app.post("/users/create", async (req, res) => {
  const user = req.body;

  if (!user.id || !user.email || !user.password || !user.username) {
    return res.status(400).json({ status: "error", message: "Incomplete user data" });
  }

  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailPattern.test(user.email)) {
    return res.status(400).json({ status: "error", message: "Invalid email format" });
  }

  const { db, client } = await connectToDatabase();

  const existingUser = await db.collection("users").findOne({ id: parseInt(user.id) });

  if (existingUser) {
    client.close();
    return res.status(400).json({ status: "error", message: "User with the same ID already exists" });
  }

  await db.collection("users").insertOne(user);
  client.close();

  res.status(200).json({ status: "ok", message: `User with ID = ${user.id} is created`, user });
});

// Get users
app.get("/users", async (req, res) => {
  const { db, client } = await connectToDatabase();

  const users = await db.collection("users").find({}).toArray();

  client.close();

  res.status(200).json({ status: "ok", users });
});

// Get users by ID
app.get("/users/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ status: "error", message: "Invalid user ID" });
  }

  const { db, client } = await connectToDatabase();

  const user = await db.collection("users").findOne({ id });

  client.close();

  if (!user) {
    return res.status(404).json({ status: "error", message: "User not found" });
  }

  res.status(200).json({ status: "ok", user });
});

// Update users
app.put("/users/update", async (req, res) => {
  const user = req.body;

  if (!user.id) {
    return res.status(400).json({ status: "error", message: "Please enter ID" });
  }

  const { db, client } = await connectToDatabase();

  const id = parseInt(user.id);
  const result = await db.collection("users").updateOne({ id }, { $set: user });

  client.close();

  if (result.modifiedCount === 0) {
    return res.status(404).json({ status: "error", message: `User with ID = ${id} not found` });
  }

  res.status(200).json({ status: "ok", message: `User with ID = ${id} is updated`, user });
});

// Login
app.post("/users/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ status: "error", message: "Incomplete user data" });
  }

  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailPattern.test(email)) {
    return res.status(400).json({ status: "error", message: "Invalid email format" });
  }

  const { db, client } = await connectToDatabase();

  const user = await db.collection("users").findOne({ email, password });

  client.close();

  if (user) {
    return res.status(200).json({ status: "ok", message: "Login successful", user });
  } else {
    return res.status(401).json({ status: "error", message: "Login failed" });
  }
});

// Logout
app.post("/users/logout", async (req, res) => {
  res.status(200).json({ status: "ok", message: "Logout successful" });
});

// Delete users by ID
app.delete("/users/delete", async (req, res) => {
  const id = parseInt(req.body.id);

  if (!id || isNaN(id)) {
    return res.status(400).json({ status: "error", message: "Please provide a valid ID to delete a user" });
  }

  const { db, client } = await connectToDatabase();

  const existingUser = await db.collection("users").findOne({ id });

  if (!existingUser) {
    client.close();
    return res.status(404).json({ status: "error", message: `User with ID = ${id} not found` });
  }

  await db.collection("users").deleteOne({ id });
  client.close();

  res.status(200).json({ status: "ok", message: `User with ID = ${id} is deleted` });
});