import React from "react";
import {useEffect, useState} from 'react';
import Textbox from './textbox';
import Btnsubmit from './btn_submit';
import Scoreboard from './score';



import "./style.css";


let winNumStan = Math.floor(Math.random() * 10 ) + 1;
let winNumExpert = Math.floor(Math.random() * 100) +1;


let currentHighScore = '';
let expertHighScore = '';



const App = () => {
const [optionSelected, setOptionSelected] = useState('');
const [trackSelection, setTrackSelection] = useState([]);

const [guessInput, setGuessInput] = useState('');
const [tooHighOrLow, setTooHighOrLow] = useState('');
const [flagButtonClick, setFlagButtonClick] = useState(false);


const trackCurrentHighScore = (currentHS) => {
  if(currentHighScore < 1) {
    currentHighScore = currentHS.length + 1;
  } else {
    if(trackSelection.length < currentHighScore) {
      currentHighScore = currentHS.length + 1;
    }
  }

  if(expertHighScore < 1) {
    expertHighScore = currentHS.length + 1;
  } else {
    if(trackSelection.length < expertHighScore) {
      expertHighScore = currentHS.length + 1;
    }
  }

};

useEffect(() => {
  if(tooHighOrLow && guessInput && flagButtonClick) {
    setTrackSelection([...trackSelection, {value:guessInput, winGuess: tooHighOrLow}]);
    if(tooHighOrLow !== 'Win') {
      alert(tooHighOrLow);
    } else if (tooHighOrLow === 'Win') {
      if(optionSelected === 'Standard') {
        if(currentHighScore === 0) {

        } else {
          if(trackSelection.length + 1 < currentHighScore) {
            alert('Congratulations for beating your high score!!!');

          } else if (trackSelection.length + 1 === currentHighScore) {
            alert('Congratulations for winning, but you did not beat your high score.');
          }
        }
      } else {
        if(optionSelected === "Expert") {
          if(expertHighScore === 0) {

          } else {
            if(trackSelection.length + 1 === expertHighScore) {
              alert('Congratulations for winning, but you did not beat your high score.')
            } else if(trackCurrentHighScore.length + 1 < expertHighScore) {
              alert('Congratulations for beating your high score!!!');
            }
          }
        }
      }
      alert(`You win! It took you ${trackSelection.length + 1}tries!`);
      trackCurrentHighScore(trackSelection);
      setGuessInput('');
      setTrackSelection([]);
      winNumStan = Math.floor(Math.random() * 10) + 1;
      winNumExpert = Math.floor(Math.random() * 100) + 1;



    };

    setFlagButtonClick(false);
  }
}, [tooHighOrLow, guessInput, flagButtonClick, trackSelection, trackCurrentHighScore])


const standard = () => {
  setOptionSelected('Standard');
}

const expert = () => {
  setOptionSelected('Expert');
}

const inputChange = (num) => {
  if(Number(num.target.value) || (num.target.value === "")) {
    setGuessInput(num.target.value)
  }
}

const changeDiff = (e) => {
  e.preventDefault();
  setOptionSelected(false);
  if(optionSelected === "Standard") {
   expertHighScore = '';
   setTrackSelection([])
  } else if (optionSelected === "Expert") {
    currentHighScore = '';
    setTrackSelection([]);
  }
}

const reset = (e) => {
  e.preventDefault();
  setTrackSelection([]);
  setGuessInput('');
  winNumStan = Math.floor(Math.random() * 10) + 1;
  winNumExpert = Math.floor(Math.random() * 100) + 1;
}


const buttonClick = (num) => {
  // Prevents Browser default behavior and re-rendering
  num.preventDefault();
  const input = parseInt(guessInput);

  // When the level is selected 
  if (optionSelected === 'Standard') {
    if (input > winNumStan && input < 11) {
      setTooHighOrLow('Too High');
    } else if (input < winNumStan && input < 11) {
      setTooHighOrLow('Too Low');
    } else if (input === winNumStan) {
      setTooHighOrLow('Win');
    } else {
      alert('Please enter a number between 1-10.');
      return;
    };
  } else if (optionSelected === 'Expert') {
    if (input > winNumExpert && input < 101) {
      setTooHighOrLow('Too High');
    } else if (input < winNumExpert && input < 101) {
      setTooHighOrLow('Too Low');
    } else if (input === winNumExpert) {
      setTooHighOrLow('Win');
    } else {
      alert('Please enter a number between 1-100.');
      return;
    };
  }
  setFlagButtonClick(true);
}


if(optionSelected) {
  return(
    <div>
    <header className="Title_Start" >{optionSelected} level</header>
    <form method="post" action="">
       <Textbox data={inputChange} value={guessInput} />
       <Btnsubmit data={buttonClick} reset={reset} changeDiff={changeDiff} />

       </form>
        <Scoreboard score={trackSelection} highScore={optionSelected === 'Standard' ? currentHighScore : expertHighScore} level={optionSelected} />

      
      

      </div>
  );
}


  return (
    <div className="container-start">
      <header className="Title_Start">guess the number</header>
      <h2 className="rules">rules:</h2>
      <p className="desc">
      First, choose a difficulty! (Easy: 1-10; Hard: 1-100). Enter in a number to see if your guess was right. Keep on trying
          to win and try beating your highscore! You can do it! :D
        </p>
        <div className="difficulty">
         <h3>select difficulty</h3>
         <form>
          <button type="button" onClick={standard}>standard</button>
          <button type="button" onClick={expert}>expert</button>
           </form>
          </div>
    </div>
  );
}


export default App;