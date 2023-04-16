import React, { useEffect } from 'react';
import './App.css';
import Dashboard from './Dashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddToDo from './AddToDo';
import EditToDo from './EditToDo';
import { initTodo } from './features/todo/todoSlice';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const loaclTodoList = localStorage.getItem('todolist')
    dispatch(initTodo(loaclTodoList ? JSON.parse(loaclTodoList) : []))
  }, [dispatch])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/add-todo' element={<AddToDo />} />
          <Route path='/edit-todo/:id' element={<EditToDo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
