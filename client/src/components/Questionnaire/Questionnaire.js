import React, { useEffect, useState } from 'react';
import photo from './images/photo.png';
import { useNavigate, useLocation } from "react-router-dom";
import './Questionnaire.css';
import axios from 'axios';
import Slider from 'react-input-slider';
import { Button } from 'react-bootstrap';
import { MDBBtn, MDBBtnGroup, MDBContainer } from "mdb-react-ui-kit";

const Questionnaire = () => {
  const id = useLocation();
  const member_id = id.state.id;
  console.log(member_id);

  const navigate = useNavigate();
  const [currentQues, setCurrentQues] = useState(0);
  const [sliderPos, setSlider] = useState({ x: 5 });
  const [showStart, setShowStart] = useState(true);
  const [questions, setQues] = useState([]);
  var [vatta, setVatta] = useState(0);
  var [pitta, setPitta] = useState(0);
  var [kapha, setKapha] = useState(0);
 
  

  try 
  {
    axios.post('http://localhost:5000/questionnaire').then((data) =>
    {
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

    try {
      vatta = ((vatta-4)/12)*10;
      pitta = ((pitta-4)/12)*10;
      kapha = ((kapha-4)/12)*10;
      vatta = Math.round((vatta + Number.EPSILON) * 100) / 100
      pitta = Math.round((pitta + Number.EPSILON) * 100) / 100
      kapha = Math.round((kapha + Number.EPSILON) * 100) / 100
      // var v = 5;
      // var p = 23;
      // var k = 234;
    
      axios.post('http://localhost:5000/doshareport', {vatta, pitta, kapha, member_id, date});
    {
      navigate('/dashboard', { state: { name: "Hardika" } })
    }
    } catch (error) 
    {
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

                    {/* <MDBContainer className="d-flex justify-content-center">
                      <div className="mx-0 mx-sm-auto">
                        <p className="fw-bold text-center">
                          {questions[0][currentQues].ques}
                        </p>

                        <MDBBtnGroup aria-label="Basic example" className="me-2">
                          <MDBBtn color="light">0</MDBBtn>
                          <MDBBtn color="light">2</MDBBtn>
                          <MDBBtn color="light">3</MDBBtn>
                          <MDBBtn color="light">4</MDBBtn>
                          <MDBBtn color="light">5</MDBBtn>
                          <MDBBtn color="light">6</MDBBtn>
                          <MDBBtn color="light">7</MDBBtn>
                          <MDBBtn color="light">8</MDBBtn>
                          <MDBBtn color="light">9</MDBBtn>
                          <MDBBtn color="light" onClick={null}>10</MDBBtn>
                        </MDBBtnGroup>
                      </div>
                    </MDBContainer> */}

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