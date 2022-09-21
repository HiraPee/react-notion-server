const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 5000;

const mongoose = require("mongoose");

require("dotenv").config(); //.envファイルの読み込み
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use("/api/v1", require("./src/v1/routes/"));

//http://localhost:5000/

try {
  mongoose.connect(process.env.MONGODB_URL);
  console.log("DB接続");
} catch (error) {
  console.log("error");
}

app.listen(PORT, () => {
  console.log("サーバー起動中・・・・");
});
