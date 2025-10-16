import React from 'react';
import Card from '../components/Card';

const Home = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
        Welcome to My React App
      </h1>
      <Card title="About This Project">
        <p>This is a responsive React application built with Vite, React Router, and Tailwind CSS. 
        It demonstrates component architecture, state management, hooks, and API integration.</p>
      </Card>
    </div>
  );
};

export default Home;
