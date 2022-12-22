import {ActionReducerMapBuilder} from '@reduxjs/toolkit';

export type TExtraReducers<T> = (builder: ActionReducerMapBuilder<T>) => void;
