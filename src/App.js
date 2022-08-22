//import './App.css';

import React from "react";
import { TodoCounter } from "./components/TodoCounter";
import { TodoSearch } from "./components/TodoSearch";
import { TodoList } from "./components/TodoList";
import { TodoItem } from "./components/TodoItem";
import { CreateTodoButton } from "./components/CreateTodoButton";

/* const defaultTodos = [
  {text:'Cortar el pelo', completed:false},
  {text:'Sacar la basura', completed:true},
  {text:'Sacar a passear al perro', completed:false},
  {text:'Ver video de franco escamilla', completed:false},
]; */

function useLocalStorage(itemName, initialValue){
  const localStorageItem = localStorage.getItem(itemName);
  let pasrsedItem;
  
  if(!localStorageItem){
    pasrsedItem = initialValue;
    localStorage.setItem(itemName, JSON.stringify(pasrsedItem));
  }else{
    pasrsedItem = JSON.parse(localStorageItem);
  }
  
  const [item, setTodos] = React.useState(pasrsedItem);
  const saveItem = (newItem) => {
    const strignifiedItem = JSON.stringify(newItem);
    setTodos(newItem);
    localStorage.setItem(itemName, strignifiedItem);
  }
  return [
    item,
    saveItem
  ]
}

React.useEffect(() => {
  console.log('use efect')
}, [totalTodos]);

function App(props) {
  const [todos, saveTodos] = useLocalStorage('TODOS_V1', []);


  const [searchValue, setSearchValue] = React.useState('');

  const completedTodos = todos.filter( el => !!el.completed ).length;
  const totalTodos = todos.length;

  

  const completeTodo = (text) => {
    const index = todos.findIndex(todo => todo.text === text);
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;

    saveTodos(newTodos);
  }

  const deleteTodo = (text) => {
    const index = todos.findIndex(todo => todo.text === text);
    const newTodos = [...todos];
    newTodos.splice(index,1);

    saveTodos(newTodos);
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
