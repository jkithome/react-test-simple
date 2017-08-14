import React from 'react';
import { shallow } from 'enzyme';
import { Todo } from '../src/components/Todo';
import sinon from 'sinon';

// Use array destructurig to create mock functions.
const [editTodo, toggleTodo, deleteTodo] = new Array(3).fill(jest.fn());

function shallowSetup() {
  // Sample props to pass to our shallow render
  const props = {
    id: '7ae5bfa3-f0d4-4fd3-8a9b-61676d67a3c8',
    title: 'Todo',
    project: 'Project',
    done: false,
    url: 'https://www.photos.com/a_photo',
    createdAt: '2017-03-02T23:04:38.003Z',
    editTodo,
    toggleTodo,
    deleteTodo,
  };
  // wrapper instance around rendered output
  const enzymeWrapper = shallow(<Todo {...props} />);

  return {
    props,
    enzymeWrapper,
  };
}

describe('Shallow rendered Todo Card', () => {
  it('should render a card with the details of the Todo', () => {
    // Setup wrapper and assign props.
    const { enzymeWrapper, props } = shallowSetup();
    // enzymeWrapper.find(selector) : Find every node in the render tree that matches the provided selector. 
    expect(enzymeWrapper.find('img').hasClass('ui image')).toBe(true);
    expect(enzymeWrapper.find('.header').text()).toBe(props.title);
    expect(enzymeWrapper.find('button.ui.basic.red.button').text()).toBe('Delete');
    // enzymeWrapper.containsMatchingElement(node i.e reactElement) : Check if the provided React element matches one element in the render tree. Returns a boolean.
    expect(enzymeWrapper.containsMatchingElement(<button>Delete</button>)).toBe(true);
  });
});

describe('Todo form', () => {
  let wrapper,props_;
  beforeEach(() => {
    // spy on the component handleOpen method
    sinon.spy(Todo.prototype, 'handleOpen');
    const { enzymeWrapper, props } = shallowSetup();
    wrapper = enzymeWrapper;
    props_ = props;
  });
  afterEach(() => {
    Todo.prototype.handleOpen.restore();
  });
  it('should update the state property `formOpen` and call handleOpen when edit button is clicked', () => {
    // find the edit button and simulate a click on it
    const button = wrapper.find('button').first();
    button.simulate('click');
    // The handleOpen method should be called.
    expect(Todo.prototype.handleOpen.calledOnce).toBe(true);
    // The value of this.state.formOpen should now be true
    expect(wrapper.state().formOpen).toEqual(true);
  });
  it('should display different buttons', () => {
    const button = wrapper.find('button').first();
    button.simulate('click');
    // When we click the edit button, the Update button should be present.
    expect(wrapper.find('button.ui').length).toBe(2);
    expect(wrapper.find('button.ui.basic.green.button').text()).toBe(' Update');
  });
  it('should display current values in edit fields', () => {
    const button = wrapper.find('button').first();
    button.simulate('click');
    // Before any edits are made, the prepopulated values in the input fields should be the same passed through props.
    expect(wrapper.find('input').at(0).props().defaultValue).toEqual(props_.title);
  });
});

describe('Editing todos', () => {
  let wrapper, props_;
  // In this before each, we are opening the form and changing the to-do title value before each of the tests is run. This helps us to avoid having to do this repeatedly for every it block.
  beforeEach(() => {
    // spy on the component handleFieldChange method
    sinon.spy(Todo.prototype, 'handleFieldChange');
    // spy on the component handleEdit method
    sinon.spy(Todo.prototype, 'handleEdit');
    // spy on the component handleClose method
    sinon.spy(Todo.prototype, 'handleClose');
    const { enzymeWrapper, props } = shallowSetup();
    wrapper = enzymeWrapper;
    props_ = props;
    const button = wrapper.find('button').first();
    button.simulate('click');
    // find the input field containing the todo title and simulate a change to it's value
    const titleInput = wrapper.find('input').at(0);
    titleInput.simulate('change', {
      target: {
        value: 'Changed title',
        name: 'title',
      },
    });
  });
  afterEach(() => {
    Todo.prototype.handleFieldChange.restore();
    Todo.prototype.handleEdit.restore();
    Todo.prototype.handleClose.restore();
  });
  it('should change state when input values change and call handleFieldChange', () => {
    // this.state.todo should now have a title field with it's value as the new title we entered.
    expect(wrapper.state().todo.title).toEqual('Changed title');
    // Since we simulated a change to an input field, the handleFieldChange event handler should be called.
    expect(Todo.prototype.handleFieldChange.calledOnce).toBe(true);
  });
  describe('Submit edits', () => {
    it('should call handleEdit, editTodo and handleClose when update button is clicked', () => {
      const button = wrapper.find('button.ui.basic.green.button');
      button.simulate('click');
      // Confirm that the different component methods called when we submit edits are called.
      expect(Todo.prototype.handleEdit.calledOnce).toBe(true);
      expect(Todo.prototype.handleClose.calledOnce).toBe(true);
      // the mock function we passed to the renderer instead of the action should be called and with the new values we entered.
      expect(editTodo).toBeCalledWith(props_.id, { title: 'Changed title' });
    });
  });
});

