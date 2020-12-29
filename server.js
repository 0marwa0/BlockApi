const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const Items = require("./routes/Items");
const List = require("./routes/List");
const Templist = require("./routes/Templist");
const Users = require("./routes/Users");
const Maintainers = require("./routes/Maintainers");

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.listen(5000, () => {
  console.log("server is up and running");
});
app.use("/", Items);
app.use("/", List);
app.use("/", Templist);
app.use("/", Users);
app.use("/", Maintainers);
