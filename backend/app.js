const express = require("express");
const app = express();

app.use(express.json());

// ROUTES FIRST
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running");
});

// THEN START SERVER
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
