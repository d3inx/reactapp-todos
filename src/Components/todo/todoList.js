import React, { useContext }  from "react";
import Todo from "./Todo";
import axios from "axios";
//import context
import TodoConText from './../../Context/todoContext';


function TodoList (props) {

    const todoContext = useContext(TodoConText);
    const {todoList , setTodoList , statusDone , setStatusDone , loading , setLoading , loadingBtn , setLoadingBtn} = todoContext;
    
        
    const deleteTodo = (key) => {
        setLoadingBtn(true);
        let deleteItem = todoList.todos.find(item => item.key === key)
        axios.delete(`https://react-training-a48a6-default-rtdb.firebaseio.com/todos/${deleteItem.key}.json`)
            .then(response => {
                setTodoList(prevState => {
                    return {
                        todos : prevState.todos.filter(item => item.key !== key)
                    }
                })
                setLoadingBtn(false);
            })
            .catch(err=> {
                console.log(err);
            })
    }
    const doneTodo = (key) => {
        setLoadingBtn(true);
        let doneItemStatus = todoList.todos.find(item => item.key === key)
        axios.patch(`https://react-training-a48a6-default-rtdb.firebaseio.com/todos/${doneItemStatus.key}.json`,{done : !doneItemStatus.done})
            .then(response => {
                setTodoList({
                    todos : [
                        ...todoList.todos , 
                        !doneItemStatus.done ? doneItemStatus.done =  true : doneItemStatus.done =  false
                    ]
                })
                setLoadingBtn(false);
            })
    }
    const  editTodo = (setEdit) =>  {setEdit(true)}

    const  cancelTodo = (setEdit) =>  {setEdit(false)}

    const applyTodo = (key , text , setEdit) => {
        setLoadingBtn(true);
        
        let editItem = todoList.todos.find(item => item.key === key)
        axios.patch(`https://react-training-a48a6-default-rtdb.firebaseio.com/todos/${editItem.key}.json`,{stateInput : text})
            .then(response => {
                editItem.stateInput = text;
                setEdit(false)
                setLoadingBtn(false);
            })
            .catch(err => console.log(err))
    }

    

    let filterTodo = todoList.todos.filter(item => item.done === statusDone)
    return (
        <TodoConText.Provider value={{
            deleteTodo : deleteTodo ,
            doneTodo : doneTodo ,
            editTodo : editTodo ,
            applyTodo : applyTodo ,
            cancelTodo : cancelTodo ,
        }}>
            <>
                {
                    loadingBtn
                    ?   <div className="loading">
                            <div className="lds-ripple"><div></div><div></div></div>
                        </div>
                    : null
                }
                <nav className="col-lg-6 col-sm-12 mb-3">
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <a className={`nav-item nav-link font-weight-bold ${!statusDone ? "active" : ""}`} id="nav-home-tab" onClick={() => setStatusDone(false)}>undone <span className="badge bg-secondary">{todoList.todos.filter(item => item.done === false).length}</span></a>
                        <a className={`nav-item nav-link font-weight-bold ${statusDone ? "active" : ""}`} onClick={() => setStatusDone(true)}>done <span className="badge bg-success">{todoList.todos.filter(item => item.done === true).length}</span></a>
                    </div>
                </nav>

                {
                    loading 
                    ?   <div className="loading">
                            <div className="lds-ripple"><div></div><div></div></div>
                        </div>
                    : 
                        filterTodo.length === 0 
                        ? <p>there isn't any Todo</p>
                        : filterTodo.map(item => <Todo key={item.key} item={item} />)
                }
            </>
        </TodoConText.Provider>
    )
}

export default TodoList