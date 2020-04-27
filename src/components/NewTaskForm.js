// @ts-check

import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../actions/index.js';

const mapStateToProps = () => {
  const props = {};
  return props;
};

const actionCreators = {
  addTask: actions.addTask,
};

class NewTaskForm extends React.Component {
  // BEGIN (write your solution here)
  handleSubmit = (values) => {
    const { addTask, reset } = this.props;
    addTask({
      task: { ...values, id: _.uniqueId(), state: 'active' },
    });
    reset();
  };
  // END

  render() {
    const { handleSubmit } = this.props;
    return (
      <form className="form-inline" onSubmit={handleSubmit(this.handleSubmit)}>
        <div className="form-group mx-3">
          <Field name="text" required component="input" type="text" />
        </div>
        <input type="submit" className="btn btn-primary btn-sm" value="Add" />
      </form>
    );
  }
}

const ConnectedNewTaskForm = connect(
  mapStateToProps,
  actionCreators
)(NewTaskForm);
// BEGIN (write your solution here)
export default reduxForm({
  form: 'newTask',
})(ConnectedNewTaskForm);
// END
