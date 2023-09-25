import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CreateCollection: React.FC = () => {
    const [collectionName, setCollectionName] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
  
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const response = await fetch('http://localhost:3364/api/collections', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: collectionName }),
    });

    if (response.ok) {
      const createdCollection = await response.json();
      setSuccessMessage(`Collection created with ID ${createdCollection.id}`);
      setErrorMessage('');
    } else {
      const errorData = await response.json();
      setErrorMessage(`Error: ${errorData.error}`);
      setSuccessMessage('');
    }
  } catch (error) {
    console.error('Error creating collection:', error);
    setErrorMessage('Internal server error');
    setSuccessMessage('');
  }
};
  
  return (
    <div className="container mx-auto mt-5">
      <h2 className="text-2xl font-bold mb-4">Create a Collection</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="collectionName" className="block text-sm font-medium text-gray-700">
            Collection Name
          </label>
          <input
            type="text"
            id="collectionName"
            name="collectionName"
            value={collectionName}
            onChange={(e) => setCollectionName(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Create Collection
          </button>
        </div>
      </form>
      <div className="mt-10">
      <Link to="/collections" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">
        Back
      </Link>
      </div>
    <div>
    {successMessage && <p className="text-success">{successMessage}</p>}
    {errorMessage && <p className="text-error">{errorMessage}</p>}
    </div>
    </div>
  );
};

export default CreateCollection;
