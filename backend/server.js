const express = require("express");
const dotenv = require("dotenv");
const emailRoutes = require("./routes/emailRoutes");

const app = express();
dotenv.config();

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions)); // ✅ This line now uses the declared options
// const corsOptions = {
//   origin: "*",
//   credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// };

// app.use(cors()); // Use this after the variable declaration

// app.use(express.json()); // tell the server to accept the json data from frontend

//Signup and login
// app.use("/email", emailRoutes);
// Other imports and middleware setup...

// Routes
app.use("/email", emailRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// ✅ Add this line before starting the server
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// const PORT = process.env.PORT;
// app.listen(PORT, () => {
//   console.log(`Example app listening on port ${PORT}`);
// });
