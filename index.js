const express = require("express");
const app = express();

app.use(express.static("public")); // uses the public folder for static files

app.listen(3001);
