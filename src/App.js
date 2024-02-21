import React, { useState } from 'react';
import './App.css';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editTask, setEditTask] = useState({ id: null, taskName: '' });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event) => {
    setNewTask(event.target.value);
  };

  const getCurrentDateTime = () => {
    const currentDateTime = new Date();
    return `${currentDateTime.toLocaleDateString()} ${currentDateTime.toLocaleTimeString()}`;
  };

  const addTask = () => {
    if (newTask.trim() === '') {
      setErrorMessage('Please enter a task before adding.');
      return;
    }

    if (editTask.id !== null) {
      setTodoList(
        todoList.map((task) =>
          task.id === editTask.id ? { ...task, taskName: newTask, updated: getCurrentDateTime() } : task
        )
      );
      setEditTask({ id: null, taskName: '' });
    } else {
      const task = {
        id: todoList.length === 0 ? 1 : todoList[todoList.length - 1].id + 1,
        taskName: newTask,
        added: getCurrentDateTime(),
        updated: null,
      };
      setTodoList([...todoList, task]);
    }
    setNewTask('');
    setErrorMessage('');
  };

  const deleteTask = (id) => {
    setTodoList(todoList.filter((task) => task.id !== id));
  };

  const editTaskHandler = (task) => {
    setEditTask({ id: task.id, taskName: task.taskName });
    setNewTask(task.taskName);
    setErrorMessage('');
  };

  return (
    <div className="App">
      <div className='header'>
        <h1>Todo App</h1>
      </div>
      <div className='addTask'>
        <input className='inputField' onChange={handleChange} value={newTask} placeholder='Add a new task...' />
        <button className='addButton' onClick={addTask}>{editTask.id !== null ? 'Update Task' : 'Add Task'}</button>
      </div>
      {errorMessage && <p className='errorMessage'>{errorMessage}</p>}
      <div className='list'>
        {todoList.map((task) => (
          <div key={task.id} className='taskContainer'>
            <h1>{task.taskName}</h1>
            <p>Added: {task.added}</p>
            {task.updated && <p>Updated: {task.updated}</p>}
            <div className='buttonContainer'>
              <button className='editButton' onClick={() => editTaskHandler(task)}>Edit</button>
              <button className='deleteButton' onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
