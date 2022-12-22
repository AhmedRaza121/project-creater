import {TID} from '../../store/models/creator/typings/types';

export interface ICreatorService {
	generateID({isDefaultValue}:{isDefaultValue: boolean}): TID;
}
