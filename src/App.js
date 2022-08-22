//import './App.css';

import React from "react";
import { TodoCounter } from "./components/TodoCounter";
import { TodoSearch } from "./components/TodoSearch";
import { TodoList } from "./components/TodoList";
import { TodoItem } from "./components/TodoItem";
import { CreateTodoButton } from "./components/CreateTodoButton";

const defaultTodos = [
  {text:'Cortar el pelo', completed:false},
  {text:'Sacar la basura', completed:true},
  {text:'Sacar a passear al perro', completed:false},
  {text:'Ver video de franco escamilla', completed:false},
]

function App(props) {
  const [todos, setTodos] = React.useState(defaultTodos);
  const [searchValue, setSearchValue] = React.useState('');

  const completedTodos = todos.filter( el => !!el.completed ).length;
  const totalTodos = todos.length;

  const completeTodo = (text) => {
    const index = todos.findIndex(todo => todo.text === text);
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;

    setTodos(newTodos);
  }

  const deleteTodo = (text) => {
    const index = todos.findIndex(todo => todo.text === text);
    const newTodos = [...todos];
    newTodos.splice(index,1);

    setTodos(newTodos);
  }
  
  const filteredTodos = (searchValue !== '') ? todos.filter(el => el.text.toLowerCase().includes(searchValue.toLowerCase())) : todos;

  return (
    <React.Fragment>
      <TodoCounter
        total={totalTodos}
        completed={completedTodos} />
      <TodoSearch
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <TodoList>
        {filteredTodos.map((el,id) => (
          <TodoItem 
            key={el.text} 
            text={el.text}
            completed={el.completed}
            onComplete={() => { completeTodo(el.text) }}
            onDelete={()=> {deleteTodo(el.text)}}   
          />   
              
        ))}
      </TodoList>
      <CreateTodoButton />
    </React.Fragment>
  );
}

export default App;
