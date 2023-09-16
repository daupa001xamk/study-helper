import React, { useState, useEffect } from 'react';
import Flashcard from './Flashcard';

interface FlashcardType {
  question: string;
  answer: string;
  isCorrect: boolean;
}

const initialFlashcards: FlashcardType[] = [
  { question: 'What is 2 + 2?', answer: '4', isCorrect: false },
  { question: 'What is the capital of France?', answer: 'Paris', isCorrect: false },
  { question: 'What is 2 + 5?', answer: '7', isCorrect: false },
  { question: 'What is the capital of Finland?', answer: 'Helsinki', isCorrect: false },
  { question: 'What is 2 + 6?', answer: '8', isCorrect: false },
  { question: 'What is the capital of Sweden?', answer: 'Stockholm', isCorrect: false },
  // Add more flashcards here
];

const shuffleArray = (array: FlashcardType[]): FlashcardType[] => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const FlashcardGame: React.FC = () => {
  const [flashcards, setFlashcards] = useState(shuffleArray(initialFlashcards));
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);

  useEffect(() => {
    if (flashcards.every((card) => card.isCorrect)) {
      console.log('All cards completed!');
    }
  }, [flashcards]);

  const handleMark = (correct: boolean) => {
    const updatedFlashcards = [...flashcards];
    updatedFlashcards[currentCardIndex] = {
      ...updatedFlashcards[currentCardIndex],
      isCorrect: correct,
    };
    setFlashcards(updatedFlashcards);

    if (correct) {
      setCorrectCount(correctCount + 1);
    } else {
      setIncorrectCount(incorrectCount + 1);
    }

    showNextCard();
  };

  const showNextCard = () => {
    const allCorrect = flashcards.every((card) => card.isCorrect);

    if (!allCorrect) {
      let nextIndex;
      do {
        nextIndex = flashcards.findIndex((card, index) => index > currentCardIndex && !card.isCorrect);
      } while (flashcards[nextIndex]?.isCorrect);

      if (nextIndex !== -1) {
        setCurrentCardIndex(nextIndex);
      } else {
        setCurrentCardIndex(flashcards.length);
      }
    }
  };

  const resetGame = () => {
    setFlashcards(shuffleArray(initialFlashcards));
    setCurrentCardIndex(0);
    setCorrectCount(0);
    setIncorrectCount(0);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {currentCardIndex < flashcards.length && (
        <Flashcard
          question={flashcards[currentCardIndex].question}
          answer={flashcards[currentCardIndex].answer}
          isCorrect={flashcards[currentCardIndex].isCorrect}
          onMark={handleMark}
        />
      )}
      {currentCardIndex === flashcards.length && (
        <div>
          <div className="text-lg font-semibold text-center">
            All cards completed!
          </div>
          <div className="text-center">
            Correct: {correctCount}, Incorrect: {incorrectCount}
          </div>
          <button onClick={resetGame} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">
            Retry
          </button>
        </div>
      )}
    </div>
  );
};

export default FlashcardGame;
