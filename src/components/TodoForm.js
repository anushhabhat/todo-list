import React, { useState } from 'react';

export const TodoForm = ({ addTodo }) => {
  const [task, setTask] = useState('');
  const [fromTime, setFromTime] = useState('');
  const [toTime, setToTime] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = isValidFormData();
    if (!isValid) {
      return;
    }
    const time = `${fromTime} to ${toTime}`;
    addTodo({
      task: task,
      time: time,
    });
    setTask('');
    setFromTime('');
    setToTime('');
  };

  const isValidFormData = () => {
    if (!task) {
      setErrorMessage('Please fill in the task field.');
      return false;
    }
    if (!fromTime) {
      setErrorMessage('Please fill in the from time field.');
      return false;
    }
    if (!toTime) {
      setErrorMessage('Please fill in the to time field.');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <input type="text" value={task} onChange={(e) => setTask(e.target.value)} className="todo-input" placeholder="Enter your task here" />
      <span> Duration:</span>
      <input type="time" value={fromTime} onChange={(e) => setFromTime(e.target.value)} className="time-input" placeholder="From" />
      <input type="time" value={toTime} onChange={(e) => setToTime(e.target.value)} className="time-input" placeholder="To" />
      <button type="submit" className="todo-btn">Add</button>
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};
