const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const userRoute = require("./routes/users.js");
const fileUploadRoute = require("./routes/uploads.js");
const port = process.env.PORT || 5000;
dotenv.config();
let corsOptions = {
  origin: "*",
  credentials: false  ,
};
app.use(cors(corsOptions));
app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", "false ");
  next();
});
app.use(express.json());
app.use("/upload", express.static(path.join(__dirname, "/upload")));
app.use("/backend", userRoute);
app.use("/backend", fileUploadRoute);
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
