import React from 'react';
import toJson from 'enzyme-to-json';
import moment from 'moment';
import { shallow } from 'enzyme';
import { Todo } from '../src/components/Todo';

it('Renders correctly', () => {
  const wrapper = shallow(
    <Todo
      id="1"
      title="Todo"
      project="Project"
      done={false}
      url="https://www.photos.com/a_photo"
      createdAt={moment().subtract(1, 'days').format()}
      editTodo={jest.fn()}
      toggleTodo={jest.fn()}
      deleteTodo={jest.fn()}
    />,
  );
  expect(toJson(wrapper)).toMatchSnapshot();
});
