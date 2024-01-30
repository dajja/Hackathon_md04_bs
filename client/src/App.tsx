import React, { useEffect, useState } from 'react';
import './App.css';
import axioss from './config/axios';
import { todoType } from './type';

export default function App() {
    const [listTodo, setListTodo] = useState<Array<todoType>>([]);
    const [input, setInput] = useState<string>("");
    const [flag, setFlag] = useState<boolean>(false);
    useEffect(() => {
        async function fetchData() {
            let res = await axioss.get("/api/v1/todo");
            setListTodo(res.data);
        };
        fetchData();
    }, [flag])
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        let atodo = {
            id: 1,
            name: input,
            completed: false
        }
        try {
            let res = await axioss.post("/api/v1/todo", atodo);
            console.log(res.data.message);
            setFlag(!flag);
            setInput("");
        } catch (err) {
            console.log(err)
        }
    }
    const finishTodo = async (id: number) => {
        try {
            let res = await axioss.put(`/api/v1/todo/${id}`, { name: "complete-status" });
            console.log(res.data.message);
            setFlag(!flag);
        } catch (err) {
            console.log(err)
        }
    }
    const deleteTodo = async (id: number) => {
        try {
            let res = await axioss.delete(`/api/v1/todo/${id}`);
            console.log(res.data.message);
            setFlag(!flag);
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <>
            <main id="todolist">
                <h1>
                    Todo List
                    <span>Get things done, one item at a time.</span>
                </h1>
                <template />
                <ul>
                    {listTodo.length > 0 && listTodo.map((e) => (
                        <li key={e.id}>
                            <span className="label" style={{ textDecoration: e.completed ? 'line-through' : '' }}>{e.name}</span>
                            <div className="actions">
                                <button className="btn-picto" type="button" onClick={() => finishTodo(e.id)}>
                                    <input type="checkbox" className='material-icons input-check' />
                                </button>
                                <button className="btn-picto" type="button" title="Delete" onClick={() => deleteTodo(e.id)}>
                                    <i className="fa-regular fa-trash-can"></i>
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
                {listTodo.length <= 0 && <p className="emptylist">Your todo list is empty.</p>}
                <form name="newform" onSubmit={handleSubmit}>
                    <label htmlFor="newitem">Add to the todo list</label>
                    <input type="text" name="newitem" id="newitem" onChange={(e) => setInput(e.target.value)} value={input} />
                    <button type="submit">Add item</button>
                </form>
            </main>
        </>
    )
}
