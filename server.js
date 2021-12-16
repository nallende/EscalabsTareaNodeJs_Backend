import express from 'express';

import cors from 'cors';
import { readdirSync } from 'fs';
const bodyParser = require("body-parser");
const morgan = require("morgan");
import mongoose from 'mongoose';
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
require("dotenv").config();

//app-server
const app = express();

//middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());


// db connection
mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log("DB Connection Error: ", err));


//middlewares
app.use(morgan("dev"));
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(cors());


//routes 
readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));

const port = process.env.PORT || 8000;

// Listen on port

app.listen(port, () => console.log(`Server is running on ${port}`));