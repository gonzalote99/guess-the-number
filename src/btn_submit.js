import React from 'react';

class Btnsubmit extends React.Component {
  render() {
    return (
      <div className="container-score">
       <button onClick={this.props.data}>guess</button>
       <button onClick={this.props.reset}>reset</button>
       <button onClick={this.props.changeDiff}>change difficulty</button>

        </div>
      
    )
  }
}

export default Btnsubmit;