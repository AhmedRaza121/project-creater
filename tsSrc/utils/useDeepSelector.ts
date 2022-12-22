import isEqual from 'react-fast-compare';
import {useSelector} from 'react-redux';

export function useDeepSelector<T, P>(fn: (state: T) => any | undefined): P {
	return useSelector<T>(fn, isEqual) as unknown as P;
}