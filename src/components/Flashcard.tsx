import React, { useState } from 'react';

interface FlashcardProps {
  question: string;
  answer: string;
  isCorrect: boolean;
  onMark: (correct: boolean) => void;
}

const Flashcard: React.FC<FlashcardProps> = ({ question, answer, onMark }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  const markCard = (correct: boolean) => {
    onMark(correct);
  };

  return (
    <div className="bg-white rounded-md shadow-md p-4">
      <div className="text-lg font-semibold mb-4">{showAnswer ? answer : question}</div>
      <div className="mt-4">
        <button onClick={toggleAnswer} className="mr-2 px-4 py-2 bg-blue-500 text-white rounded-md">
          {showAnswer ? 'Hide Answer' : 'Show Answer'}
        </button>
        {!showAnswer && (
          <>
            <button onClick={() => markCard(true)} className="mr-2 px-4 py-2 bg-green-500 text-white rounded-md">
              Correct
            </button>
            <button onClick={() => markCard(false)} className="px-4 py-2 bg-red-500 text-white rounded-md">
              Wrong
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Flashcard;
