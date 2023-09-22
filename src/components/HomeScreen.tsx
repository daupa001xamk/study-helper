import React from 'react';
import { Link } from 'react-router-dom';

const HomeScreen: React.FC = () => {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
        <h2 className="text-3xl font-semibold mb-6">Select a Game</h2>
        <ul className="space-y-4">
          <li>
            <Link to="/flashcards" className="text-blue-600 hover:underline hover:text-blue-800">
              Flashcards
            </Link>
          </li>
          <li>
            <Link to="/connectMeaning" className="text-blue-600 hover:underline hover:text-blue-800">
              Connect meaning
            </Link>
          </li>
          <li>
            <Link to="/mode3" className="text-blue-600 hover:underline hover:text-blue-800">
              Collections
            </Link>
          </li>
        </ul>
      </div>
    );
  };
  
  export default HomeScreen;