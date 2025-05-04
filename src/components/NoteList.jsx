import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const NoteList = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/notes');
      console.log('Fetched notes:', response.data); // Debugging
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const deleteNote = async (id) => {
    if (!id) {
      alert('Invalid note ID');
      return;
    }

    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        console.log('Deleting note with ID:', id); // Debugging
        const response = await axios.delete(`http://localhost:5000/api/notes/${id}`);
        if (response.data) {
          setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
          alert('Note deleted successfully!');
        }
      } catch (error) {
        console.error('Error deleting note:', error);
        alert('Failed to delete note. Please try again.');
      }
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">My Notes</h1>
        <Link 
          to="/create" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200 font-medium shadow-sm"
        >
          Create New Note
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <div key={note.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">{note.title}</h2>
              <p className="text-gray-600 mb-4">{note.content}</p>
              <div className="flex space-x-2">
                <Link
                  to={`/edit/${note.id}`}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoteList;
