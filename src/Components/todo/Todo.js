import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

//import context
import TodoConText from './../../Context/todoContext';

//import css 
import'./../css/loading.css';

function Todo(props) {

    const todoContext = useContext(TodoConText);
    const { doneTodo , editTodo , applyTodo , cancelTodo , deleteTodo , loading , setloading } = todoContext;
    const [edit , setEdit] = useState(false);
    const [text , setText] = useState(props.item.stateInput)


    const inputHandler = (e) => {
        e.preventDefault();
        setText(e.target.value)
    }

    return (
        
        <div className="col-lg-6 col-sm-12 mb-2">
            {
                edit === false
                ? (
                    <div className="d-flex justify-content-between align-items-center border rounded p-3">
                        <div>
                            <Link to={`/todo/${props.item.key}`}>{props.item.stateInput}</Link>
                        </div>
                        <div>
                            <button type="button" className={`btn btn-sm ms-1 ${!props.item.done ? "btn-success" : "btn-secondary"}`} onClick={() => doneTodo(props.item.key)}>{!props.item.done ? "done" : "undone"}</button>
                            <button type="button" className="btn btn-info btn-sm ms-1" onClick={() => editTodo(setEdit)}>edit</button>
                            <button type="button" className="btn btn-danger btn-sm ms-1" onClick={() => deleteTodo(props.item.key)}>delete</button>
                        </div>
                    </div>
                    
                )
                : (
                    
                    <div className="d-flex justify-content-between align-items-center border rounded p-3">
                        <div>
                            <input value={text} onChange={inputHandler} className="form-control" />
                        </div>
                        <div>
                            <button type="button" className="btn btn-secondary btn-sm ms-1" onClick={() => cancelTodo(setEdit)}>cancel</button>
                            <button type="button" className="btn btn-info btn-sm ms-1" onClick={() => applyTodo(props.item.key , text , setEdit)}>apply</button>
                        </div>
                    </div>
                    
                )
            }
        </div>
        
    )
}


export default Todo