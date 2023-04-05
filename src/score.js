import React from 'react';
import HighScore from './HighScore';



class Scoreboard extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      data: []
    }
  }

  componentDidUpdate() {
    if(this.props.score.length !== this.state.data.length ) {
      this.setState.data = this.props.score;
    }
  }


  render() {
    return (
      <div className="container-score">
       <div className="score">
         <h2>number of guess</h2>
         {this.props.score.map((item, index) => {
           return (
             <p key={index}>{item.winGuess} {item.value}</p>
           )
         })}
         </div>

         <div className="highscore">
         <h2>high score</h2>
         <h4>{this.props.level}</h4>
         <HighScore didWin={this.props.highScore} />


           </div>

        </div> 
    )
  }
}

export default Scoreboard;
