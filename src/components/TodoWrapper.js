import React, { useState } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { EditTodoForm } from "./EditTodoForm";

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);
  const [searchTaskQuery, setSearchTaskQuery] = useState('');
  const [searchTimeQuery, setSearchTimeQuery] = useState('');
  const [idCounter, setIdCounter] = useState(0);

  const generateId = () => {
    setIdCounter(idCounter + 1);
    return idCounter.toString(); // Convert to string 
  };

  const addTodo = ({ task, time }) => {
    const newTodo = {
      id: generateId(),
      task: task,
      time: time,
      completed: false,
      isEditing: false,
    };
    setTodos([...todos, newTodo]);
  };
  
  const deleteTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const editTodo = (task, time, id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task: task, time: time, isEditing: false } : todo
      )
    );
  };

  const editTask = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const getTotalTimeInHours = () => {
    return todos.reduce((totalHours, todo) => {
      const [fromTime, toTime] = todo.time.split(" to ");
      const from = new Date(`2000-01-01T${fromTime}`);
      const to = new Date(`2000-01-01T${toTime}`);
      const difference = to - from;
      const hours = difference / (1000 * 60 * 60);
      return totalHours + hours;
    }, 0);
  };
  

  const filteredTodos = todos.filter(todo =>
    todo.task.toLowerCase().includes(searchTaskQuery.toLowerCase()) &&
    todo.time.toLowerCase().includes(searchTimeQuery.toLowerCase())
  );

  return (
    <div className="TodoWrapper">
      <h1>ToDo List</h1>
      <TodoForm addTodo={addTodo} />
      {/* display filtered todos */}
      {filteredTodos.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm editTodo={editTodo} task={todo} key={todo.id} />
        ) : (
          <div key={todo.id}>
            <Todo
              task={todo}
              deleteTodo={deleteTodo}
              editTodo={editTask}
              toggleComplete={toggleComplete}
            />
          </div>
        )
      )}
      <div>Total Time required for the above tasks: {getTotalTimeInHours().toFixed(2)} hours</div>
      <input 
        type="text" 
        className="search-input"
        value={searchTaskQuery} 
        onChange={(e) => setSearchTaskQuery(e.target.value)} 
        placeholder="Search tasks"
      />
      <br />
      <input 
        type="text" 
        className="search-input"
        value={searchTimeQuery} 
        onChange={(e) => setSearchTimeQuery(e.target.value)} 
        placeholder="Search tasks by time"
      />
      
    </div>
  );
};

