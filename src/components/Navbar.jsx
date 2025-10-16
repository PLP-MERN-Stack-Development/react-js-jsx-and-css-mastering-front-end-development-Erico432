import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="bg-blue-600 dark:bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">MyApp</Link>
          <div className="flex items-center space-x-6">
            <Link to="/" className="hover:text-blue-200 transition">Home</Link>
            <Link to="/tasks" className="hover:text-blue-200 transition">Tasks</Link>
            <Link to="/api-data" className="hover:text-blue-200 transition">API Data</Link>
            <button
              onClick={toggleTheme}
              className="px-3 py-1 bg-blue-700 dark:bg-gray-800 rounded hover:bg-blue-800 transition"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
