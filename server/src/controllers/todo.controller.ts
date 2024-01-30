import { Request, Response } from "express";
import { allUsers, newUser, changeUser, removeUser, oneUser } from "../services/todo.service";

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        let result = await allUsers();
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
    }
}
export const addUser = async (req: Request, res: Response) => {
    const { name } = req.body;
    try {
        await newUser(name);
        res.status(201).json({
            message: 'them moi thanh cong'
        })
    } catch (err) {
        console.log(err);
    }
}
export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        let result = await oneUser(+id);
        if (!result) {
            return res.status(400).json({
                message: 'ko ton tai todo'
            })
        };
        await changeUser(+id, req.body.name);
        res.status(200).json({
            message: 'sua thanh cong',
        })
    } catch (err) {
        console.log(err)
    }
}
export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        let result = await oneUser(+id);
        if (!result) {
            return res.status(400).json({
                message: 'ko ton tai todo'
            })
        };
        await removeUser(+id)
        res.status(200).json({
            message: 'xoa thanh cong'
        })
    } catch (err) {
        console.log(err)
    }
}