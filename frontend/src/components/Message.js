import React, { Component } from 'react';

class Mesasge extends Component {
   render() {
      const { message } = this.props;
      return <div className="success-msg">{message}</div>;
   }
}

export default Mesasge;
