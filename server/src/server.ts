import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import todoRouter from './routers/todo.routes';
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
todoRouter(app);
app.listen(process.env.GATE, () => {
    console.log("server is running");
})