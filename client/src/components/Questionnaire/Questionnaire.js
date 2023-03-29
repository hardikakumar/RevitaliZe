import React, { useState } from 'react';
import photo from './images/photo.png';
import { useNavigate,useLocation} from "react-router-dom";
import './Questionnaire.css';
import axios from 'axios';
//import moment from 'moment';

const Questionnaire = () => {

  const name = useLocation();
  console.log(name.state);
  const [currentQues, setCurrentQues] = useState(0);
  try
        {
            axios.post('http://localhost:5000/questionnaire').then((data) => {
            let idx = 3;
            console.log(data.data[idx].ques)
            }).catch(err => {
              console.log(err);
            })
        }
        catch(error)
        {
            console.error(error);
        }

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
    <div>
      <div className='setBackground'>
        {/* <div>
        <h1>WELCOME {name.state.name}</h1>
      </div> */}
        <div className='welcomeMsg'>
          Welcome Hardika
        </div>
        <div className='app'>
          {showScore ? (
            <div className='score-section'>
              You have scored {score} out of {questionBank.length}
              <>
                {/* <button type="submit" onClick={resetQuiz}>Play Again!!</button> */}
                {/* <button type="submit" onClick={navigate('/dashboard', {state: {name: name.state.name}})}>Play Again!!</button> */}
                <button type="submit" onClick={navigate('/dashboard', { state: { name: "Hardika" } })}>Play Again!!</button>

              </>
            </div>
          )
            : (
              <>
                <div className='question-section'>
                  <div className='question-count'>
                    <span>{currentQues + 1}</span>/{questionBank.length}
                  </div>
                  <div className='question-text'>
                    {questionBank[currentQues].Question}
                  </div>
                </div>

                {/* <div className='answer-section'>
                  {questionBank[currentQues].AnswerText.map(answer => (
                    <button type='options' onClick={() => handleAnswerResponse(answer.isCorrect)}>{answer.Answer}</button>
                  ))}
                </div> */}
                <div className='answer-section'>
                    <Rating />
                </div>
              </>
            )
          }
        </div>
        <div><img src={photo} alt="photo unavailable" /></div>
      </div>
    </div>
  );
}

export default Questionnaire;