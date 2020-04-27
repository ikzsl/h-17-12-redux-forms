// @ts-check

import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import * as actions from '../actions/index.js';

const mapStateToProps = (state) => {
  const props = {
    text: state.text,
  };
  return props;
};

const actionCreators = {
  updateNewTaskText: actions.updateNewTaskText,
  addTask: actions.addTask,
};

class NewTaskForm extends React.Component {
  handleAddTask = (e) => {
    e.preventDefault();
    const { addTask, text } = this.props;
    const task = { text, id: _.uniqueId(), state: 'active' };
    addTask({ task });
  };

  handleUpdateNewTaskText = (e) => {
    const { updateNewTaskText } = this.props;
    updateNewTaskText({ text: e.target.value });
  };

  render() {
    const { text } = this.props;

    return (
      <form action="" className="form-inline" onSubmit={this.handleAddTask}>
        <div className="form-group mx-sm-3">
          <input
            type="text"
            required
            value={text}
            onChange={this.handleUpdateNewTaskText}
          />
        </div>
        <input type="submit" className="btn btn-primary btn-sm" value="Add" />
      </form>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(NewTaskForm);
