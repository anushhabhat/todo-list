import React, { useState } from 'react';

export const EditTodoForm = ({ editTodo, task }) => {
  const [value, setValue] = useState(task.task);
  const [fromTime, setFromTime] = useState(task.time.split(' to ')[0]);
  const [toTime, setToTime] = useState(task.time.split(' to ')[1]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTime = `${fromTime} to ${toTime}`;
    editTodo(value, newTime, task.id);
  };

  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <input type="text" value={value} onChange={(e) => setValue(e.target.value)} className="todo-input" placeholder='Update task' />
      <span> Duration:</span>
      <input type="time" value={fromTime} onChange={(e) => setFromTime(e.target.value)} className="time-input" placeholder='From' />
      <input type="time" value={toTime} onChange={(e) => setToTime(e.target.value)} className="time-input" placeholder='To' />
      <button type="submit" className='todo-btn'>Update</button>
    </form>
  );
};
