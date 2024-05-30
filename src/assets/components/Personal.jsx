import React, { useState } from 'react'
import { questions } from '../data'

function Personal() {
  // console.log(questions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectOption, setSelectOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleClickOption = (option) => {
    setSelectOption(option);
  };
//   console.log(currentQuestionIndex);

  const handleNextQuestion = () => {
    if (selectOption && selectOption.is_correct) {
      setScore(score + questions[currentQuestionIndex].marks);
    }
    setSelectOption(null);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  // console.log(currentQuestion.question);
  return (
    <div>
      <h2>{currentQuestion.question}</h2>
      <ul>
        {currentQuestion.options.map((value) => (
          <li key={value.id}>
            <button onClick={handleClickOption}>{value.answer}</button>
          </li>
        ))}
      </ul>

      {selectOption && <button onClick={handleNextQuestion}>Next </button>}

      {showResult ? <div>{score}</div> : ""}
    </div>
  );
}

export default Personal