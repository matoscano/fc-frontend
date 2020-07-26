var express = require("express");
var app = express();

app.use(express.static(path.join(__dirname, 'build')));
-app.get('/', function (req, res) {
+app.get('/*', function (req, res) {
   res.sendFile(path.join(__dirname, 'build', 'index.html'));
 });

// app.use(express.static(__dirname + "/"));
app.listen(process.env.PORT || 8080);
