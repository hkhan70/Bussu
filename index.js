process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var express = require("express");
var bodyParser = require("body-parser");
var multer = require("multer");
var routes = require("./routes");

var upload = multer();
var app = express();

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());
app.use(express.static("public"));
app.use("/", routes);

app.listen(3003);