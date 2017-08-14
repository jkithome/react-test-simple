import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { editTodo, toggleTodo, deleteTodo } from '../redux/actions';

export class Todo extends Component {
  constructor() {
    super();
    this.state = {
      formOpen: false,
      todo: {},
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  // Open Todo edit form
  handleOpen() {
    this.setState({ formOpen: true });
  }

  // Close Todo edit form and reset any changes
  handleClose() {
    this.setState({ formOpen: false });
    this.setState({ todo: {} });
  }
  // Handle changes to the input fields
  handleFieldChange(e) {
    // Property to change e.g title
    const field = e.target.name;
    // New value
    const value = e.target.value;
    let todo = this.state.todo;
    todo = Object.assign({}, todo, { [field]: value });
    this.setState({ todo });
  }

  handleEdit() {
    // Send to-do id and new details to actions for updating
    this.props.editTodo(this.props.id, this.state.todo);
    this.handleClose();
  }

  handleDelete() {
    // Send to-do id to actions for deletion
    this.props.deleteTodo(this.props.id);
  }

  handleToggle() {
    // Mark a to-do as completed or incomplete
    this.props.toggleTodo(this.props.id, { done: !this.props.done });
  }

  render() {
    return (
      <div className="column">
        <div className="ui brown card">
          <img className="ui image" src={this.props.url} />
          {this.state.formOpen ?
            <div className="content">
              <div className="ui form">
                <div className="field">
                  <label>Title</label>
                  <input
                    type="text"
                    name="title"
                    defaultValue={this.props.title}
                    onChange={this.handleFieldChange}
                  />
                </div>
                <div className="field">
                  <label>Project</label>
                  <input
                    type="text"
                    name="project"
                    defaultValue={this.props.project}
                    onChange={this.handleFieldChange}
                  />
                </div>
              </div>
            </div> :
            <div className="content">
              <div className="header">{this.props.title}</div>
              <div className="meta">{this.props.project}</div>
              <div className="meta">Created {moment(this.props.createdAt).fromNow()}</div>
            </div>
          }
          <div className="extra content">
            {this.state.formOpen ?
              <div className="ui two buttons">
                <button className="ui basic green button" onClick={this.handleEdit}>
                  <i className="checkmark icon" /> Update
                </button>
                <button className="ui basic red button" onClick={this.handleClose}>
                  <i className="remove icon" /> Cancel
                </button>
              </div> :
              <div>
                <div className="ui toggle checkbox" style={{ marginBottom: '10px' }}>
                  <input type="checkbox" name="public" value="on" defaultChecked={this.props.done} onChange={this.handleToggle} />
                  <label>Complete</label>
                </div>
                <div className="ui two buttons">
                  <button className="ui basic green button" onClick={this.handleOpen}>Edit</button>
                  <button className="ui basic red button" onClick={this.handleDelete}>Delete</button>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

Todo.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  project: PropTypes.string.isRequired,
  done: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  editTodo: PropTypes.func.isRequired,
  toggleTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

export default connect(null, { editTodo, toggleTodo, deleteTodo })(Todo);
