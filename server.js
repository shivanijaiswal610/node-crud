const userRoutes = require('./routes/user.js');
const express = require("express");
const bodyparser = require("body-parser");
require("dotenv/config");
require('./database');

const PORT = process.env.PORT || 3000

var app = express();

app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);
app.use(bodyparser.json());

app.use('/user', userRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});