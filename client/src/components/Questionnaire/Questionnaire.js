import React, { useEffect, useState } from 'react';
import photo from './images/photo.png';
import { useNavigate, useLocation } from "react-router-dom";
import './Questionnaire.css';
import axios from 'axios';
import Slider from 'react-input-slider';
import { Button } from 'react-bootstrap';

const Questionnaire = () => {
  const name = useLocation();

  const [currentQues, setCurrentQues] = useState(0);
  const [sliderPos, setSlider] = useState({ x: 5 });
  const [showStart, setShowStart] = useState(true);
  const [questions, setQues] = useState([]);
  const [vatta, setVatta] = useState(0);
  const [pitta, setPitta] = useState(0);
  const [kapha, setKapha] = useState(0);


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

  const navigate = useNavigate();
  const handleSubmit = () => {
    console.log(Date().toLocaleString())  //Current Date & Time
    //Vatta, Pitta & Kapha store scores corresponding to these doshas
    
    try {
      navigate('/dashboard', { state: { name: "Hardika" } })
    } catch (error) {

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
        temp = vatta + addScore;
        setVatta(temp);
        break;
      case 'p':
        temp = pitta + addScore;
        setPitta(temp);
        break;
      case 'k':
        temp = kapha + addScore;
        setKapha(temp);
    }

    console.log('vatta: ' + vatta);
    console.log('pitta: ' + pitta);
    console.log('kapha: ' + kapha);
    const nextQues = currentQues + 1;
    if (nextQues < questions[0].length) setCurrentQues(nextQues);
    else handleSubmit();
  }


  return (
    <div>
      <div className='setBackground'>
        <div className='welcomeMsg'>
          {/* <h1>WELCOME {name.state.name}</h1> */}
          Welcome Hardika
        </div>
        <div className='app'>
          <>
            <div className='question-section'>
              {showStart ? (
                <>
                  <div class='text-center'>Ready?</div>
                  <div class='text-center'><Button onClick={() => setShowStart(false)} classname='btn btn-xl' variant='success' btn-xl>START</Button></div>
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