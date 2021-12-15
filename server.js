import express from 'express';
//const connectDB = require("./database");
import cors from 'cors';
import { readdirSync } from 'fs';
//const bodyParser = require("body-parser");
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

//db coonection
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

//route:option
/*app.use('/api', userRoutes );*/

//routes Opcion 2 con filesyn es lo que se esta usando
readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));

const port = process.env.PORT || 8000;

// Listen on port

app.listen(port, () => console.log(`Server is running on ${port}`));