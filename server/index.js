const express = require("express");

const app = express();
const cors = require("cors");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const issueRoutes = require('./routes/issues');

app.use('/', issueRoutes)

app.listen(1234, () => {
    console.log("server listeing on port: 1234");
})