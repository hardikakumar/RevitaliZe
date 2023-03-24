import React, { useState } from 'react';
import photo from './images/photo.png';
import { useNavigate} from "react-router-dom";
import './Questionnaire.css';

const Questionnaire = () => {
  var questionBank = [
    {
      Question: 'This is question 1',
      AnswerText: [
        { Answer: 'Option1', isCorrect: true },
        { Answer: 'Option2', isCorrect: false },
        { Answer: 'Option3', isCorrect: false }
      ]
    },
    {
      Question: 'This is question 2',
      AnswerText: [
        { Answer: 'Option1', isCorrect: false },
        { Answer: 'Option2', isCorrect: true },
        { Answer: 'Option3', isCorrect: false }
      ]
    }
  ]

  //useState Hook
  const [currentQues, setCurrentQues] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswerResponse = (isCorrect) => {
    if (isCorrect) setScore(score + 1);

    const nextQues = currentQues + 1;
    if (nextQues < questionBank.length) setCurrentQues(nextQues);
    else setShowScore(true);
  }

  const resetQuiz = () => {
    setCurrentQues(0);
    setScore(0);
    setShowScore(false);
  }

  const navigate = useNavigate();

  return (
    <div className='setBackground'>
      <div className='app'>
        {showScore ? (
          <div className='score-section'>
            You have scored {score} out of {questionBank.length}
            <>
              {/* <button type="submit" onClick={resetQuiz}>Play Again!!</button> */}
              <button type="submit" onClick={navigate('/dashboard')}>Play Again!!</button>
            </>
          </div>
        )
          : (
            <>
              <div className='question-section'>
                <div className='question-count'>
                  <span>{currentQues+1}</span>/{questionBank.length}
                </div>
                <div className='question-text'>
                  {questionBank[currentQues].Question}
                </div>
              </div>

              <div className='answer-section'>
                {questionBank[currentQues].AnswerText.map(answer => (
                  <button type='options' onClick={() => handleAnswerResponse(answer.isCorrect)}>{answer.Answer}</button>
                ))}
              </div>
            </>
          )
        }
      </div>
      <div><img src={photo} alt="photo unavailable" /></div>
    </div>
  );
}

export default Questionnaire;