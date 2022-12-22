import {TProjectType} from '../../../../typings/type/TProjectType';
import {TRecordFormField} from '../../../../services/field/typings/types';

export type TTypeState = {
	loading: boolean,
	isEmpty: boolean,
	types: TProjectType[]
	typeField: TRecordFormField | null
}

export type TGetProjectTypePayload = {
	selectedType: string,
	types: TProjectType[],
	typeField: TRecordFormField | null
}

export type TCheckedType = {
	sysId: string,
	label: string
}
