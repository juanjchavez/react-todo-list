//import './App.css';

import React from "react";
import { TodoCounter } from "./components/TodoCounter";
import { TodoSearch } from "./components/TodoSearch";
import { TodoList } from "./components/TodoList";
import { TodoItem } from "./components/TodoItem";

const todos = [
  {text:'Cortar el pelo', completed:false},
  {text:'Sacar la basura', completed:true},
  {text:'Sacar a passear al perro', completed:false},
  {text:'Ver video de franco escamilla', completed:false},
]

function App(props) {
  return (
    <React.Fragment>
      <TodoCounter />
      <TodoSearch />
       <TodoList>
        {todos.map((el,id) => (
          <TodoItem key={id} text= {el.text} />          
        ))}
       </TodoList>
       {
        /* <CreateTodo /> */
        }
    </React.Fragment>
  );
}

export default App;
