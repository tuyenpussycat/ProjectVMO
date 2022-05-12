require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");
const categoryRouter = require("./routes/category");
const payment = require("./routes/payment");
const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.p4b9a.mongodb.net/projectReactjs?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
connectDB();
const app = express();
app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.get("/ping", (req, res) => res.json({ abc: 1 }));
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/category", categoryRouter);
app.use("/api/payment", payment);
const PORT = 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
