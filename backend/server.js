import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import emailRoutes from "./routes/emailRoutes.js";  // Note the .js extension here

dotenv.config();

const app = express();

const corsOptions = {
  origin: "*",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Important: Add this line so backend can parse JSON from frontend requests
app.use(express.json());

// Use your email routes
app.use("/email", emailRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
