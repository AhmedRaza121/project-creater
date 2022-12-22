import {TRecordFormField} from '../../services/field/typings/types';

export type TFullLayout = { layout: 'full' }
export type TColumnLayout = { layout: 'column' }

export type TLayout = TFullLayout | TColumnLayout;

export type TFieldFullLayout = {
	fields: TRecordFormField[]
}

export type TFieldsColumnLayout = {
	left: TRecordFormField[],
	right: TRecordFormField[]
}

export type TFullComposition = TFullLayout & TFieldFullLayout;
export type TColumnComposition = TColumnLayout & TFieldsColumnLayout;

export type TFieldComposition<T> = T extends TFullLayout ? TFullComposition : TColumnComposition;

