import React, { Component } from 'react';

class ErrorMessage extends Component {
   render() {
      const { message } = this.props;
      return <div className="error-msg">{message}</div>;
   }
}

export default ErrorMessage;
