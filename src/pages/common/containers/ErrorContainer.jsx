import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ErrorMessage } from '../components/ErrorMessage';
import { removeError } from '../../../actions/messageAction';

class ErrorContainer extends Component {
  constructor(props) {
    super(props);

    this.closeMessage = this.closeMessage.bind(this);
  }

  closeMessage(errorId) {
    const { dispatch } = this.props;
    dispatch(removeError(errorId));
  }

  render() {
    const { errors } = this.props;

    return (
      <div>
        {Array.isArray(errors) && errors.map((error) => (
          <ErrorMessage
            error={error}
            handleClose={this.closeMessage}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    errors: state.messageReducers.errors
  };
};

export default connect(mapStateToProps)(ErrorContainer);
