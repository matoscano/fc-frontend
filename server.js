var express = require("express");
const path = require("path");
var app = express();

app.use(express.static(path.join(__dirname, "build")));

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.use(express.static(__dirname + "/"));
app.listen(process.env.PORT || 8080);
