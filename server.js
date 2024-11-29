import https from "https";
import fs from "fs";
import path from "path";
import express from "express";
import { fileURLToPath } from "url";

// Replace __dirname with ES module equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Load HTTPS certificate and private key
const options = {
  key: fs.readFileSync(path.join(__dirname, "certs", "localhost.key")),
  cert: fs.readFileSync(path.join(__dirname, "certs", "localhost.crt")),
};

// Serve static files from the "dist" directory
app.use(express.static(path.join(__dirname, "dist")));

// Catch-all route to serve `index.html` for React routing
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Start HTTPS server
https.createServer(options, app).listen(8100, () => {
  console.log("Server is running at https://localhost:8100");
});
