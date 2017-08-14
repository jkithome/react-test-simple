import reducer, { initialState} from '../src/redux/reducer';

describe('todos reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toMatchSnapshot();
  });

  it('should handle TODO_REQUEST', () => {
    expect(
      reducer(initialState,
        {
          type: 'TODO_REQUEST',
        }),
    ).toMatchSnapshot();
  });
});
