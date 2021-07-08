const express = require("express");

const app = express();

const port = process.env.PORT || 5000;

app.use("/", () => console.log("testmessage"));

app.listen(port, () => console.log(`Server started on port ${port}`));