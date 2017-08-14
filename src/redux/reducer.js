export const initialState = { // Exporting it for test purposes
  requesting: false,
  todos: [],
  error: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'TODO_REQUEST':
      // Changes the requesting field in state to true to show we are currently fetching to-dos
      return Object.assign({}, state,
        {
          requesting: true,
          error: null,
        },
        // State should look like this:
        // {
        //  requesting: true,
        //  todos: [],
        //  error: null,
        // }
      );
    default:
      return state;
  }
}
