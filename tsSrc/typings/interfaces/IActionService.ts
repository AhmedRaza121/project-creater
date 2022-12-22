import {TFormAction} from '../../store/models/form/typings/types';

export interface IActionService {
	runInUiAction(action: TFormAction, sysId?: string): Promise<any>;
}
