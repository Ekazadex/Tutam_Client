import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';

const EditNote = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      if (!id) {
        alert('Invalid note ID');
        navigate('/');
        return;
      }

      try {
        console.log('Fetching note with ID:', id); // Debugging
        const response = await axios.get(`http://localhost:5000/api/notes/${id}`);
        console.log('Fetched note data:', response.data); // Debugging
        
        if (response.data) {
          setTitle(response.data.title);
          setContent(response.data.content);
        } else {
          throw new Error('Note not found');
        }
      } catch (error) {
        console.error('Error fetching note:', error);
        alert('Failed to fetch note. Redirecting to home page.');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!id) {
      alert('Invalid note ID');
      return;
    }

    try {
      console.log('Updating note:', { id, title, content }); // Debugging
      const response = await axios.put(`http://localhost:5000/api/notes/${id}`, {
        title,
        content
      });

      if (response.data) {
        alert('Note updated successfully!');
        navigate('/');
      }
    } catch (error) {
      console.error('Error updating note:', error);
      alert('Failed to update note. Please try again.');
    }
  };

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Edit Note</h1>
        <Link 
          to="/" 
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          Back to Notes
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200 min-h-[200px]"
              required
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition-colors duration-200 font-medium shadow-sm"
          >
            Update Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditNote;
