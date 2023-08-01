const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./app/routes/index.routes.js");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

// Middleware untuk akses .env
dotenv.config();

// Middleware untuk membaca request json
app.use(bodyParser.json());

// Middleware untuk parse cookie
app.use(cookieParser());

// Set konfigurasi CORS
const corsOption = {
  // origin: "https://indekos.art",
  origin: "http://127.0.0.1:5500",
  credentials: true,
};

// Middleware CORS
app.use(cors(corsOption));

// Routes
app.use("/api", routes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
