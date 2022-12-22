import { combineReducers, Reducer, ReducersMapObject } from '@reduxjs/toolkit';

import { distributionReducer } from './models/distribution/distribution.slice';
import { sectionReducer } from './models/section/section.slice';
import { creatorReducer } from './models/creator/creator.slice';
import { formReducer } from './models/form/form.slice';
import { typeReducer } from './models/type/type.slice';
import { surveyReducer } from './models/survey/survey.slice';
import { closeReducer } from './models/close/close.slice';

export function rootReducer<T>(): any {
  const reducerMap: ReducersMapObject<T> = {
    creator: creatorReducer,
    form: formReducer,
    section: sectionReducer,
    type: typeReducer,
    distribution: distributionReducer,
    survey: surveyReducer,
    close: closeReducer,
  } as unknown as ReducersMapObject<T>;
  return combineReducers(reducerMap);
}
