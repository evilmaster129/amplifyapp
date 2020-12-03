import React, {useState, useRef, useEffect} from 'react';
import TodoList from './TodoList'
import uuidv4 from 'uuid/v4'

const LOCAL_STORAGE_KEY = 'todosApp.todos'
function App() {
  const [todos, setTodos] = useState([])
  const nameTodoRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function onAddTodo(e) {
    const name = nameTodoRef.current.value

    if(name === '') return

    console.log(name)

    setTodos( prevTodos => {
      return [...prevTodos, { id:uuidv4(), name:name, complete: false}]
    })

    nameTodoRef.current.value = null
  }

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function onClearComplete(e) {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo}/>
      <input ref={nameTodoRef} type="text" />
      <button onClick={onAddTodo}>Add Todo</button>
      <button onClick={onClearComplete}>Clear Complete</button>
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </>
  );
}

export default App;
