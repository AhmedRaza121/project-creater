import React, {FC, useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {getProjectTypes, setActiveType} from '../../../store/models/type/type.thunk';
import {TTypeState} from '../../../store/models/type/typings/types';
import {TProjectType} from '../../../typings/type/TProjectType';
import {useDeepSelector} from '../../../utils/useDeepSelector';
import {TypeSectionPreloader} from './TypeSection.preloader';
import {IStore} from '../../../store/typing/interfaces';
import {hexToRGB} from '../../../utils/hex-to-rgb.util';
import {Type} from '../Type/Type';

export const TypeSection: FC = () => {
	const {types, isEmpty, loading} = useDeepSelector<IStore, TTypeState>(state => state.type);

	const dispatch = useDispatch();

	useEffect(() => {
		if (isEmpty) dispatch(getProjectTypes());
	}, []);

	if (loading) return <TypeSectionPreloader/>;

	const handleCheckedType = (sysId: string, label: string) => dispatch(setActiveType({sysId, label}));

	const labelToClass = (label: string) => {
		return label.replace(/\s/g, '_').toLocaleLowerCase();
	};

	const generateStyle = (types: TProjectType[]) => {
		if (!types) return;

		const classes = types.reduce((accumulator, {color, label}) => {
			const classLabel = labelToClass(label);

			return `${accumulator}
			.select-type-option.${classLabel}.is-checked, .select-type-option.${classLabel}:hover {
				border-color: ${color} !important;
				background: ${hexToRGB(color, 0.4)} !important;
			}
			.select-type-option.${classLabel}.is-checked {
				background: ${hexToRGB(color, 0.4)} !important;
			}`;
		}, '');

		return (
			<style type="text/css">{classes}</style>
		);
	};

	return <div className="type-container">
		<h2 className="header-text">
			Which type do you want to use for this projects?
		</h2>

		<div className="body">
			<p className="select-type-status">
				<b>Select one of type</b>
			</p>
			<div className="select-type-option-container">
				{generateStyle(types)}
				{isEmpty && <h3>No active types</h3>}
				{types.map(
					({label, description, image, sysId, checked}) => (
						<Type
							key={sysId}
							sysId={sysId}
							checked={checked}
							image={image}
							label={label}
							description={description}
							className={labelToClass(label)}
							setChecked={handleCheckedType}
						/>
					)
				)}
			</div>
		</div>
	</div>;
};
