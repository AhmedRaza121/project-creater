import { PreloadedState, Store } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import React from 'react';

import { createReduxStore } from './store/rootStore';
import { IStore } from './store/typing/interfaces';
import { Main } from './pages/Main';

const initialStore = {} as PreloadedState<IStore>;
const store: Store<IStore> = createReduxStore<IStore>(initialStore);

const App = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <Main />
      </Provider>
    </React.StrictMode>
  );
};

export default App;
