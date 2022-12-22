import {applyMiddleware, createStore, PreloadedState, Store} from '@reduxjs/toolkit';
import {composeWithDevTools} from 'redux-devtools-extension/logOnlyInProduction';
import { setAutoFreeze } from 'immer';
import thunk from 'redux-thunk';

import {rootReducer} from './rootReducer';

setAutoFreeze(false);

export function createReduxStore<T>(initialState?: PreloadedState<T>): Store<T> {
	const middleware = [thunk];
	return createStore(rootReducer(), initialState, composeWithDevTools(applyMiddleware(...middleware)));
}
