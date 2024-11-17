const express = require('express');
const { connectDB } = require('./utils/connection');
const userRouter = require("./routes/authroute");
const requireAuth = require("./middleware/requireAuth");
const BlogRouter = require('./routes/blogroute');
const router = express.Router();
const cors = require('cors');

// Load environment variables from .env file
require('dotenv').config();

// Creating express object
const app = express();

 
app.use(
  cors({
    origin: true,
  })
);

app.use(express.json());

// Port Number
const PORT =  4000;
app.use('/auth',userRouter)
app.use('/blog', requireAuth, BlogRouter);
app.get("/", (req, res) => {
  res.send("Hello, welcome to the server!");
});

// Server Setup
app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server running at http://localhost:${PORT}`);
});

