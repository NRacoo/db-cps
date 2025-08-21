const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors")
dotenv.config();

const PORT = process.env.PORT;
app.use(cors({
    origin:"https://localhost:3001",
    methods:["GET","POST"],
    credentials:true,
    allowedHeaders:["Content-type", "Authorization"]
}));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("HELLO WORLF");
});
const apiRoutes = require("./api/app");

app.use("/api", apiRoutes);

app.listen(PORT, (req, res) => {
    console.log(`server listen to port ${PORT}`);
});