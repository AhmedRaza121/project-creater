import React, {FC, Fragment} from 'react';

import {LestGetStarted} from './buttons/LestGetStarted';
import {Continue} from './buttons/Continue';
import {Create} from './buttons/Create';
import {Back} from './buttons/Back';

export const CreatorFooter: FC = () => {
	return <Fragment>
		<div
			style={{marginRight: '1rem'}}
		>
			<Back />
		</div>
		<LestGetStarted />
		<Continue />
		<Create/>
	</Fragment>;
};
