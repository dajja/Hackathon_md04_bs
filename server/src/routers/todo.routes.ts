import { Express } from "express";
import { getAllUsers, addUser, updateUser, deleteUser } from "../controllers/todo.controller";
const todoRouter = (app: Express) => {
    app.get("/api/v1/todo", getAllUsers);
    app.post("/api/v1/todo", addUser);
    app.put("/api/v1/todo/:id", updateUser);
    app.delete("/api/v1/todo/:id", deleteUser);
}

export default todoRouter;