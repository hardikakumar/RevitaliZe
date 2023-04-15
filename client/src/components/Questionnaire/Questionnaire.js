import React, { useEffect, useState, useRef } from 'react';
import photo from './images/photo.png';
import { useNavigate, useLocation } from "react-router-dom";
import './Questionnaire.css';
import axios from 'axios';
import Slider from 'react-input-slider';
import { Button } from 'react-bootstrap';

const Questionnaire = () => {
  const id = useLocation();
  const member_id = id.state.id;
  const name = id.state.name;
  // const member_id = '641df0dcf6fa41af073446c8';
  // const name = 'Hardika';

  const navigate = useNavigate();
  const [currentQues, setCurrentQues] = useState(0);
  const [sliderPos, setSlider] = useState({ x: 5 });
  const [showStart, setShowStart] = useState(true);
  const [questions, setQues] = useState([]);
  const vattaScore = useRef(0);
  const pittaScore = useRef(0);
  const kaphaScore = useRef(0);

  try {
    axios.post('http://localhost:5000/questionnaire').then((data) => {
      questions.push(data.data);
    }).catch(err => {
      console.log(err);
    })
  }
  catch (error) {
    console.error(error);
  }

  const handleSubmit = () => {
    const date = Date().toLocaleString();
    const vatta = (((vattaScore.current-4)/12)*10).toFixed(1);
    const pitta = (((pittaScore.current-4)/12)*10).toFixed(1);
    const kapha = (((kaphaScore.current-4)/12)*10).toFixed(1);


    try {
      axios.post('http://localhost:5000/doshareport', { vatta, pitta, kapha, member_id, date });
      {
        navigate('/dashboard', { state: { id: member_id, name: name } })
      }
    } catch (error) {
      console.error(error);
    }
  }


  const handleAnswerResponse = (pos) => {
    var addScore;
    if (pos <= 2) addScore = 1;
    else if (pos <= 5) addScore = 2;
    else if (pos <= 8) addScore = 3;
    else addScore = 4;

    var temp;
    switch (questions[0][currentQues].dosha) {
      case 'v':
        vattaScore.current += addScore;
        break;
      case 'p':
        pittaScore.current += addScore;
        break;
      case 'k':
        kaphaScore.current += addScore;
        
    }

    const nextQues = currentQues + 1;
    if (nextQues < questions[0].length) setCurrentQues(nextQues);
    else handleSubmit();
  }


  return (
    <div>
      <div className='setBackground'>
        <div className='welcomeMsg'>
          Hello {name.split(' ')[0]},
        </div>
        <div className='app'>
          <>
            <div className='question-section'>
              {showStart ? (
                <>
                  <div class='text-center'>Ready?</div>
                  <div class='text-center'><Button onClick={() => setShowStart(false)} classname='btn btn-lg btn-block' variant='success' btn-lg btn-block>START</Button></div>
                </>
              )
                : (
                  <>
                    {/* Counter of questions */}
                    <div className='question-count'>
                      <span>{currentQues + 1}</span>/{questions[0].length}
                    </div>

                    {/* Question */}
                    <div className='question-text'>
                      {questions[0][currentQues].ques}
                    </div>

                    {/* Slider */}
                    <div>{sliderPos.x + '/10'}</div>
                    <Slider
                      axis="x"
                      xstep={1}
                      xmin={1}
                      xmax={10}
                      x={sliderPos.x}
                      onChange={({ x }) => setSlider({ x: parseFloat(x.toFixed(2)) })}
                    />

                    <br />
                    <Button onClick={() => handleAnswerResponse(sliderPos.x)} variant='light'>Next</Button>
                  </>
                )
              }
            </div>
          </>
        </div>
        <div><img src={photo} alt="photo unavailable" /></div>
      </div>
    </div>
  );
}

export default Questionnaire;