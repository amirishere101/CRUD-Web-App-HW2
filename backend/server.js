const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(
    `mongodb+srv://amirhawasly1403:DxnRzXCEL4Lh9DLu@cluster0.4gz5h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB Atlas:", error.message);
  });

const itemSchema = new mongoose.Schema({
  name: String,
  id: Number,
  points: Number,
});

const Item = mongoose.model("Item", itemSchema);

const initializeData = async () => {
  const items = await Item.find();
  if (items.length === 0) {
    const initialItems = [
      { name: "Steve Smith", id: 211, points: 80 },
      { name: "Jian Wong", id: 122, points: 92 },
      { name: "Chris Peterson", id: 213, points: 91 },
      { name: "Sai Patel", id: 524, points: 94 },
      { name: "Andrew Whitehead", id: 425, points: 99 },
      { name: "Lynn Roberts", id: 626, points: 90 },
      { name: "Robert Sanders", id: 287, points: 75 },
    ];
    await Item.insertMany(initialItems);
    console.log("Initial data added to the database");
  }
};

app.get("/items", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

app.post("/items", async (req, res) => {
  const newItem = new Item(req.body);
  await newItem.save();
  res.json(newItem);
});

app.put("/items/:id", async (req, res) => {
  const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updatedItem);
});

app.delete("/items/:id", async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ message: "Item deleted" });
});

app.listen(port, async () => {
  await initializeData();
  console.log(`Server is running on http://localhost:${port}`);
});
