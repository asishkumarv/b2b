require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");

const app = express();

app.use(cors());
app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ limit: "500mb", extended: true }));

// Routes
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/content", require("./routes/contentRoutes"));
app.use("/api/blogs", require("./routes/blogRoutes"));
app.use("/api/enquiries", require("./routes/enquiryRoutes"));
app.use("/api/upload", require("./routes/uploadRoutes"));
app.use("/api/staff", require("./routes/staffRoutes"));

const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: true }).then(() => {
  console.log("Database connected");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error("Database connection failed:", err);
});
