const express = require("express");
const connectTOMongoDB = require("./DBConnection")
const cors = require("cors");
const app = express();
const PORT = 4000;

connectTOMongoDB("mongodb://127.0.0.1:27017/fullstackTest")
.then(() => console.log("connected to mongodb"))
.catch((err) => console.log(err));

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use("/user", require("./routers/user"));

app.listen(PORT, () => console.log(`server running on port ${PORT}`));