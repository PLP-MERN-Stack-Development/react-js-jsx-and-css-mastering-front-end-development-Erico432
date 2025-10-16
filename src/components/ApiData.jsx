import React, { useState, useEffect } from 'react';
import Card from './Card';
import Button from './Button';
import { fetchPosts } from '../api/fetchPosts';

const ApiData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const posts = await fetchPosts(page, 10);
      setData(posts);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredData = data.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="bg-red-50 dark:bg-red-900">
        <p className="text-red-600 dark:text-red-200">Error: {error}</p>
        <Button onClick={fetchData} variant="danger" className="mt-4">Retry</Button>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Search posts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-700"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredData.map(post => (
          <Card key={post.id} title={post.title}>
            <p>{post.body.substring(0, 100)}...</p>
          </Card>
        ))}
      </div>
      <div className="flex justify-center space-x-4 mt-6">
        <Button
          onClick={() => setPage(prev => Math.max(1, prev - 1))}
          disabled={page === 1}
          variant="secondary"
        >
          Previous
        </Button>
        <span className="py-2 px-4 dark:text-white">Page {page}</span>
        <Button
          onClick={() => setPage(prev => prev + 1)}
          variant="primary"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ApiData;
