const express = require("express");
const app = express();

const studentRotes = require("./routes/student.routes");
const connectDB = require("./config/database");

connectDB();
const PORT = process.env.PORT;

app.use(express.urlencoded({ extended: false }));

//setup the mongoose ;

app.use(express.json());

app.use("/api/students", studentRotes);

app.listen(PORT, () => {
  console.log("my server is running succesfully", PORT);
});
