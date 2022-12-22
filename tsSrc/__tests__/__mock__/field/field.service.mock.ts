import {IFieldService} from '../../../typings/interfaces/IFieldService';
import {TRecordFormField} from '../../../services/field/typings/types';

export class FieldServiceMock implements IFieldService {
	getFieldByName(fields: TRecordFormField[], fieldName: string): TRecordFormField | undefined {
		return undefined;
	}

	getFieldsByNames(fields: TRecordFormField[]): (acc: TRecordFormField[], fieldName: string) => TRecordFormField[] {
		return function (p1: TRecordFormField[], p2: string) {
			return [];
		};
	}
}
