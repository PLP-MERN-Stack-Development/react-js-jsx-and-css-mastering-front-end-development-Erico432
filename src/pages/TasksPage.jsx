import React from 'react';
import TaskManager from '../components/TaskManager';

const TasksPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Task Manager</h1>
      <TaskManager />
    </div>
  );
};

export default TasksPage;
