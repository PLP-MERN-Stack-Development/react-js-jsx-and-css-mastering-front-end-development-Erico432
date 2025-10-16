import React, { useState, useEffect } from 'react';
import Button from './Button';

const useLocalStorageTasks = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text) => {
    if (text.trim()) {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          text,
          completed: false,
          createdAt: new Date().toISOString(),
        },
      ]);
    }
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return { tasks, addTask, toggleTask, deleteTask };
};

const TaskManager = () => {
  const { tasks, addTask, toggleTask, deleteTask } = useLocalStorageTasks();
  const [newTaskText, setNewTaskText] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(newTaskText);
    setNewTaskText('');
  };

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Task Manager</h2>
      <form onSubmit={handleSubmit} className="flex mb-4">
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="Add a new task"
          className="flex-grow px-4 py-2 rounded-l border border-gray-300 dark:bg-gray-700 dark:text-white"
        />
        <Button type="submit" variant="primary" className="rounded-r">Add</Button>
      </form>
      <div className="flex space-x-2 mb-4">
        <Button onClick={() => setFilter('all')} variant={filter === 'all' ? 'primary' : 'secondary'}>All</Button>
        <Button onClick={() => setFilter('active')} variant={filter === 'active' ? 'primary' : 'secondary'}>Active</Button>
        <Button onClick={() => setFilter('completed')} variant={filter === 'completed' ? 'primary' : 'secondary'}>Completed</Button>
      </div>
      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id} className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
            <span
              className={`flex-grow cursor-pointer ${task.completed ? 'line-through text-gray-400' : 'text-gray-800 dark:text-white'}`}
              onClick={() => toggleTask(task.id)}
            >
              {task.text}
            </span>
            <Button onClick={() => deleteTask(task.id)} variant="danger" size="sm">Delete</Button>
          </li>
        ))}
      </ul>
      <div className="mt-4 text-gray-600 dark:text-gray-300">
        {tasks.filter((task) => !task.completed).length} tasks remaining
      </div>
    </div>
  );
};

export default TaskManager;
