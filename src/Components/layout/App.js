import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css'
import loadable from "@loadable/component";
import axios from "axios";

//import context
import TodoContext from './../../Context/todoContext'



// import components
const Header = loadable(() => import('./Header'));
const Home = loadable(() => import('./Home'));
const About = loadable(() => import('./About'));
const Contact = loadable(() => import('./Contact'));
const SingleTodo = loadable(() => import('./SingleTodo'));
const NotFound = loadable(() => import('./NotFound'));






function App() {

    
    const [todoList , setTodoList] = useState({todos : []})
    const [statusDone , setStatusDone] = useState(false);
    const [loading , setLoading] = useState(false);
    const [loadingBtn , setLoadingBtn] = useState(false);
    useEffect(() =>{
      setLoading(true);
      
      axios.get('https://react-training-a48a6-default-rtdb.firebaseio.com/todos.json')
     .then(response => dataToArray(response.data))
     .catch(err => console.log(err))
    },[])
    const dataToArray = (data) => {
      let todoData = Object
                      .entries(data)
                      .map(([key , value]) => {
                          return {
                              ...value , 
                              key
                          }
                      });
    setTodoList({
      todos : [
        ...todoData
      ]
    })
    setLoading(false);
  }
  
    return (
        <TodoContext.Provider value={{
          loadingBtn : loadingBtn,
          setLoadingBtn : setLoadingBtn,
          loading : loading,
          setLoading : setLoading,
          todoList : todoList,
          setTodoList : setTodoList,
          statusDone : statusDone,
          setStatusDone : setStatusDone,
        }}>
          <div className="App">
        <Header />
        <main>
          
          <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="/todo/:id" element={<SingleTodo />}/>
              <Route path="/about" element={<About />}/>
              <Route path="/contact" element={<Contact />}/>
              <Route path="*" element={<NotFound />}/>
          </Routes>
        </main>
    </div>
        </TodoContext.Provider>
    )
}

export default App