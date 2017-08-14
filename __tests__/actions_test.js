import configureMockStore from 'redux-mock-store';

// In a real application we would import this from our actions
const createSuccess = todo => ({
  type: 'CREATE_SUCCESS',
  todo,
});

// Create a mock store
const mockStore = configureMockStore();
const store = mockStore({});
describe('action creators', () => {
  it('creates CREATE_SUCCESS when creating a to-do was successful', () => {
    // Dispatch the createSuccess action with the values of a new to-do.
    store.dispatch(createSuccess(
      {
        id: 1,
        title: 'Example',
        project: 'Testing',
        createdAt: '2017-03-02T23:04:38.003Z',
        modifiedAt: '2017-03-22T16:44:29.034Z',
      },
    ));
    expect(store.getActions()).toMatchSnapshot();
  });
});
