// src/Quiz.jsx
import React, { useState, useEffect } from "react";
import { questions } from "../data";

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [time, setTime] = useState(15); 

  useEffect(() => {
    if (time > 0) {
      const timerId = setInterval(() => setTime(time - 1), 1000);
      return () => clearInterval(timerId);
    }
  }, [time]);

  const handleOptionChange = (optionId) => {
    setSelectedOptionId(optionId);
  };

  const handleNextQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const selectedOption = currentQuestion.options.find(
      (option) => option.id === selectedOptionId
    );

    if (selectedOption && selectedOption.is_correct) {
      setScore(score + currentQuestion.marks);
    }
    setSelectedOptionId(null);
    setTime(60); // Reset the timer for the next question

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  if (showResult || time === 0) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-3xl font-bold mb-4">Quiz Completed!</h2>
          <p className="text-lg">Your Score: {score}</p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="flex justify-center items-center w-full h-screen bg-gradient-to-b from-purple-900 to-gray-900">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full text-center">
        <div className="w-96  mx-auto">
          <div className="mb-10 rounded-full bg-red-500 w-20 text-white h-20 flex justify-center mx-auto p-6 text-2xl">
            {time}
          </div>
        </div>
        <h2 className="text-2xl font-bold  text-white bg-orange-400 py-2 rounded-lg mb-9">
          {currentQuestion.question}
        </h2>
        <ul className="mb- grid sm:grid-cols-2">
          {currentQuestion.options.map((option) => (
            <li key={option.id} className="flex justify-center mb-4 ">
              <button
                onClick={() => handleOptionChange(option.id)}
                className={`w-3/4 py-2 rounded-lg text-lg font-bold border-2 ${
                  selectedOptionId === option.id
                    ? "bg-green-500 text-white"
                    : "bg-gray-700 text-white"
                }`}
              >
                {String.fromCharCode(
                  65 + currentQuestion.options.indexOf(option)
                )}
                . {option.answer}
              </button>
            </li>
          ))}
        </ul>
        {selectedOptionId !== null && (
          <button
            onClick={handleNextQuestion}
            className="mt-6 bg-indigo-600 w-full text-white py-2 px-4 rounded-lg hover:bg-indigo-500 transition duration-150"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
