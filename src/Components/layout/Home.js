import React from "react";
import FormAddTodo from "../todo/FormAddTodo";
import TodoList from "../todo/todoList";

function Home () {
 

    return (
        <>
        <section className="jumbotron">
            <div className="container d-flex flex-column align-items-center">
                <h1 className="jumbotron-heading">Welcome!</h1>
                <p className="lead text-muted">To get started, add some items to your list:</p>
                <div className="form-inline">
                    <FormAddTodo />
                </div>
            </div>
          </section>
        <div className="todosList">
            <div className="container">
                <div className="d-flex flex-column align-items-center ">
                    <TodoList />
                </div>
            
            </div>
        </div>
        </>
    )
}

export default Home