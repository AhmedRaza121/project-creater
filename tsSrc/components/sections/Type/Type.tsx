import React, {FC} from 'react';
import classNames from 'classnames';

import checkedIcon from '../../../assets/images/checked.svg';
import circle from '../../../assets/images/circle.svg';
import {ITypeProps} from './typings/interfaces';

export const Type: FC<ITypeProps> = ({sysId, description, checked, image, label, className, setChecked}) => {
	const handleClick = () => setChecked(sysId, label);

	return <div
		key={sysId}
		id={sysId}
		className={classNames({
			'select-type-option': true,
			[className]: true,
			'is-checked': checked
		})}
		onClick={handleClick}
	>
		<img
			className="option--checkbox"
			height="22"
			width="22"
			alt=""
			src={checked ? checkedIcon : circle}
		/>
		<label className="option--body">
			{image ? <img
				className="option--body__img"
				height="150"
				src={image}
				alt={label}/>
				:
				<div className="option--body__img"/>
			}
			<b className="option--body__label">{label}</b>
			<p className="option--body__description">{description}</p>
		</label>
	</div>;
};
