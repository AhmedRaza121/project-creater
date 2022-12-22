import {TRecordFormField} from '../../services/field/typings/types';

export interface IFieldService {
	getFieldByName(fields: TRecordFormField[], fieldName: string): TRecordFormField | undefined
	getFieldsByNames(fields: TRecordFormField[]): (acc: TRecordFormField[], fieldName: string) => TRecordFormField[]
}
