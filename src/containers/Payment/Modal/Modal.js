import React from 'react';
import posed, { PoseGroup } from 'react-pose';
import './Modal.css';

const Content = posed.div({
  enter: {
    y: 0,
    opacity: 1,
    delay: 300,
    transition: {
      y: { type: 'spring', stiffness: 1000, damping: 15 },
      default: { duration: 300 }
    }
  },
  exit: {
    y: 50,
    opacity: 0,
    transition: { duration: 150 }
  }
});

const Shade = posed.div({
  enter: { opacity: 1 },
  exit: { opacity: 0 }
});

class Modal extends React.Component {
  state = { isVisible: false };

  componentDidMount() {
    this.setState({
      isVisible: true
    });
  }

  closeModal() {
    this.setState({ isVisible: false });
    setTimeout(() => this.props.closeModal(), 500);
  }

  render() {
    const { isVisible } = this.state;

    return (
      <PoseGroup>
        {isVisible && [
          // If animating more than one child, each needs a `key`
          <Shade
            key="shade"
            className="shade"
            onClick={() => this.closeModal()}
          />,
          <Content key="content" className="content">
            {this.props.children}
          </Content>
        ]}
      </PoseGroup>
    );
  }
}

export default Modal;
