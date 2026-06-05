const express = require('express');
const cors = require('cors');
require('dotenv').config();

const chatRoutes = require("./routes/chat");

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Backend is running");
});

app.use("/api/chat", chatRoutes);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});