import { db } from "../config/db.config";

export const allUsers = async () => {
    try {
        let [result] = await db.execute("select * from todo");
        return result;
    } catch (err) {
        console.log(err);
    }
}
export const oneUser = async (id: number) => {
    try {
        let [result]: any = await db.execute("select * from todo where id=?", [id]);
        return result[0];
    } catch (err) {
        console.log(err);
    }
}
export const newUser = async (name: string) => {
    try {
        let [result]: any = await db.execute("insert into todo (name, completed) values (?,false)", [name])
        return result.insertId
    } catch (err) {
        console.log(err)
    }
}
export const changeUser = async (id: number, name: string) => {
    try {
        if (name == "complete-status") {
            let [result]: any = await db.execute("update todo set completed = !completed where id = ?", [id])
            return result.insertId;
        } else {
            let [result]: any = await db.execute("update todo set name = ? where id = ?", [name, id])
            return result.insertId
        }
    } catch (err) {
        console.log(err);
    }
}
export const removeUser = async (id: number) => {
    try {
        let [result]: any = await db.execute("delete from todo where id = ?", [id])
        return result.insertId
    } catch (err) {
        console.log(err)
    }
}