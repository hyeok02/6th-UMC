import React, { useState } from 'react';
import './App.css';

function Todo() {
  const [taskInput, setTaskInput] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [completedList, setCompletedList] = useState([]);

  const addTask = () => {
    if (taskInput.trim() !== '') {
      setTodoList([...todoList, taskInput.trim()]);
      setTaskInput('');
    }
  };

  const completeTask = (index) => {
    const task = todoList[index];
    const updatedTodoList = todoList.filter((_, i) => i !== index);
    setTodoList(updatedTodoList);
    setCompletedList([...completedList, task]);
  };

  const deleteTask = (index, listType) => {
    if (listType === 'todo') {
      const updatedTodoList = todoList.filter((_, i) => i !== index);
      setTodoList(updatedTodoList);
    } else {
      const updatedCompletedList = completedList.filter((_, i) => i !== index);
      setCompletedList(updatedCompletedList);
    }
  };

  return (
    <div className="container">
      <h1>To Do List</h1>
      <div className="input-container">
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="할 일을 입력하세요"
        />
        <button onClick={addTask}>추가</button>
      </div>
      <div className="lists-container">
        <div className="task-list">
          <h2>해야 할 일</h2>
          {todoList.map((task, index) => (
            <div key={index}>
              {task}
              <button className="complete-btn" onClick={() => completeTask(index)}>완료</button>
            </div>
          ))}
        </div>
        <div className="task-list">
          <h2>해낸 일</h2>
          {completedList.map((task, index) => (
            <div key={index}>
              {task}
              <button className="delete-btn" onClick={() => deleteTask(index, 'completed')}>삭제</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Todo;