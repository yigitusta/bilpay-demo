import React, { Component } from 'react';
import posed from 'react-pose';

const Img = posed.img({
  init: {
    scale: 0.1,
    transition: {
      duration: 500
    }
  },
  big: {
    scale: 1.1,
    transition: {
      duration: 500
    }
  }
});

class Success extends Component {
  render() {
    return (
      <Img src="images/success.png" alt="Success" style={{width: "30%"}} pose="big" initialPose="init" />
    );
  }
}

export default Success;