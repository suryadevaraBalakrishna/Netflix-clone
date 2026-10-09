const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const server = express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.get("/", (request, response) => {
  response.send("Server is running");
});

server.get("/favicon.ico", (request, response) => {
  response.status(204).end();
});

require("./routes/user.routes")(server);

// Connect to MongoDB
mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });

// Export the app for Vercel
module.exports = server;

// Run locally only
if (require.main === module) {
  const PORT = process.env.PORT || 5000;

  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}