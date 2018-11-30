import React from 'react';
import { render } from 'react-testing-library';
import { createMockStore } from 'redux-test-utils';
import { Provider } from 'react-redux';

export default (component, initialState, store) => {
  if (!store) store = createMockStore(initialState);
  return render(
    <Provider store={store}>
      {component}
    </Provider>
  )
};
