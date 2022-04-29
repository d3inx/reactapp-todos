import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

//import context
import TodoConText from './../../Context/todoContext';
function SingleTodo () {

    const todoContext = useContext(TodoConText);
    const { todoList } = todoContext;
    const params = useParams();
    let item;
    item = todoList.todos.find(item => item.key == params.id);
    

    return (
        <>
            {
                
            }
            <div className="d-flex justify-content-between align-items-center border rounded p-3">
                <div>
                    <div to={`/todo/${item.key}`}>{item.stateInput}</div>
                </div>
                <div>
                    <button type="button" className={`btn btn-sm ms-1 ${!item.done ? "btn-success" : "btn-secondary"}`} >{item.done ? "done" : "undone"}</button>

                </div>
            </div>
        </>
    )
}

export default SingleTodo