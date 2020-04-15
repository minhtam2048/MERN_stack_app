const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const app = express();

// Connect DB
connectDB();

// Init middleware: get data from request's body
app.use(express.json({ extended: false }));
// CORS
app.use(cors({ origin: "http://localhost:3000" }));

app.get("/", (req, res) => res.send("API running"));

// Define routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
