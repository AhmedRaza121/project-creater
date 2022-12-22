import {TExtraReducers} from '../../../typings/type/TExtraReducers';
import {TTypeState} from './typings/types';
import {getProjectTypes, setActiveType} from './type.thunk';

export const typeExtraReducer: TExtraReducers<TTypeState> = (builder) => {
	builder
		.addCase(getProjectTypes.pending, (state) => {
			state.loading = true;
		})
		.addCase(getProjectTypes.fulfilled, (state, action) => {
			const {types, selectedType, typeField} = action.payload;

			return {
				...state,
				loading: false,
				types: types.map((type) => ({
					...type,
					checked: type.sysId === selectedType
				})),
				isEmpty: types.length === 0,
				typeField
			};
		})
		.addCase(setActiveType.fulfilled, (state, {payload: {sysId}}) => {
			state.types = state.types.map(type => ({
				...type,
				checked: type.sysId === sysId
			}));
		});
};
