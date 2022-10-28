import express from "express";
import cors from "cors";
import morganBody from "morgan-body";

const app = express();

app.use(cors({
    origin:'*'
}));

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json())

morganBody(app);

app.get('/', (req, res) => {
    res.status(200).json({
        "message":"Servidor funcionando"
    })
});

try {
    app.listen(3000);
} catch (error) {
    console.error(error);
}