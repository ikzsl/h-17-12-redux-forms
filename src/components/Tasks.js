// @ts-check

import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index.js';
import { filteredTasksSelector } from '../selectors/index.js';

// BEGIN (write your solution here)
const mapStateToProps = (state) => {
  const { tasks: { byId, allIds }, tasksUIState } = state;
  const tasks = allIds.map(id => byId[id]);
  return { tasks, tasksUIState };
};
// END

const actionCreators = {
  removeTask: actions.removeTask,
  toggleTaskState: actions.toggleTaskState,
};

class Tasks extends React.Component {
  handleRemoveTask = id => () => {
    const { removeTask } = this.props;
    removeTask({ id });
  };

  handleToggleTaskState = id => () => {
    const { toggleTaskState } = this.props;
    toggleTaskState({ id });
  };

  renderTasks() {
    const { tasks } = this.props;

    return (
      <div className="mt-3">
        <ul className="list-group">
          {tasks.map(({ id, text, state }) => (
            <li key={id} className="list-group-item d-flex">
              <span className="mr-auto">
                <button type="button" data-test="task-toggle-state" className="btn btn-link" onClick={this.handleToggleTaskState(id)}>
                  {state === 'active' ? text : <s>{text}</s>}
                </button>
              </span>
              <button type="button" data-test="task-remove" className="close" onClick={this.handleRemoveTask(id)}>
                <span>&times;</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  render() {
    const { tasks } = this.props;

    if (tasks.length === 0) {
      return null;
    }

    return (
      <div className="mt-3">
        {this.renderTasks()}
      </div>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(Tasks);
