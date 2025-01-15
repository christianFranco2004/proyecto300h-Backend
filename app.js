import express from "express";
import dotenv from "dotenv";
import { connectionMongo } from "./src/config/dataBase.js";
import { productRouter } from "./src/ROUTES/product.routes.js";
import { orderRouter } from "./src/routes/order.routes.js";
import { usersRouter } from "./src/ROUTES/user.routes.js";
import loginRouter from "./src/ROUTES/login.routes.js";
import cors from "cors";

const app = express();
dotenv.config();
connectionMongo ();
app.use(cors());

app.use(express.json()); 
app.use('/productos', productRouter);
app.use("/ordenes", orderRouter);
app.use('/usuarios', usersRouter);
app.use('/iniciarSesion', loginRouter);


const port = process.env.PORT;

app.listen (port, ()=> {
    console.log("se esta ejecutando el puerto " + port)
});  