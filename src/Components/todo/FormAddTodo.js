import axios from "axios";
import React, { useContext, useState } from "react";

//import context
import TodoConText from './../../Context/todoContext';

function FormAddTodo () {

    const [stateInput , setInputState] = useState('');
    const todoContext = useContext(TodoConText);
    const {setTodoList  , setLoadingBtn} = todoContext;


    const formHandler = (e) => {
        e.preventDefault();
        
        if (stateInput !== '' ) {
            setLoadingBtn(true);
            let todo = { done : false , doneText : '' , stateInput}
            axios.post('https://react-training-a48a6-default-rtdb.firebaseio.com/todos.json' , todo)
            .then(response => {
                setTodoList(prevState => {
                    return {
                        todos : [
                            ...prevState.todos,
                            todo 
                        ]
                    }
                })
                setLoadingBtn(false)
            })
            .catch(err => console.log(err))
            setInputState('');
        }
        
    
    }

    const inputHandler = e =>  setInputState(e.target.value);
    

    return (
        <form className="form-group d-flex" onSubmit={formHandler}>
            <input type="text" className="form-control mx-sm-3" placeholder="i want to do ..." value={stateInput}  onChange={inputHandler}/>
            <button type="submit" className="btn btn-primary">add</button>
        </form>
    )
}

export default FormAddTodo