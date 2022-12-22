import {IForm} from '@storeworkflows/form-logic-generator/lib/interface/IForm';
import {FC} from 'react';

import {TFormActionUpdater} from '../../typings/type/TFormUpdater';
import {TFormVariables} from '../../typings/type/TFormVariables';
import {TID} from '../../store/models/creator/typings/types';

export type TFormModelGenerator = (variables: TFormVariables, id: TID, updater: TFormActionUpdater) => Promise<IForm>

export type TObjectUtil = {
	getValue<O, R>(object: O, path: string, defaultValue?: R): R
}

export type TSectionRenders = Map<string, FC>
