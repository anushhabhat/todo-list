import React from 'react';

const getTimeDifference = (fromTime, toTime) => {
  const from = new Date(`2000-01-01T${fromTime}`);
  const to = new Date(`2000-01-01T${toTime}`);
  const difference = to - from;
  const hours = difference / (1000 * 60 * 60);
  return `${hours.toFixed(2)} hours`; 
};

export const Todo = ({ task, deleteTodo, editTodo, toggleComplete }) => {
  return (
    <div className="Todo">
      <p className={`${task.completed ? 'completed' : 'incompleted'}`} onClick={() => toggleComplete(task.id)}>
        <b>{task.task}</b> <div>{task.time}</div> <div>{getTimeDifference(task.time.split(" to ")[0], task.time.split(" to ")[1])}</div>
      </p>
      
      <div>
        <button className="edit-btn" onClick={() => editTodo(task.id)}>Edit</button>
        <button className="delete-btn" onClick={() => deleteTodo(task.id)}>Delete</button>
      </div>
    </div>
  );
};

