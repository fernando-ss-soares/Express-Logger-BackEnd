import express from "express";
import cors from "cors";
import morganBody from "morgan-body";
import mongoose from "mongoose";

import Request from "./routes/request.js"
import User from "./routes/user.js"

const app = express();

app.use(cors({
    origin:"*"
}));

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json())

morganBody(app);

app.use("/request", Request);
app.use("/user", User);

app.get("/", (req, res) => {
    res.status(200).json({
        "message":"Servidor funcionando!"
    })
})

try {
    mongoose.connect(`mongodb+srv://santosfernando2377:34778929@cluster0.tlgvyak.mongodb.net/?retryWrites=true&w=majority`);
    console.log('Conectamos ao Banco de Dados')
    app.listen( process.env.PORT || 3000);
} catch (error) {
    console.error(error);
}