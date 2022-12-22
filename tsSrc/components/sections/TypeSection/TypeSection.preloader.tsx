import React, {FC, Fragment} from 'react';
import {Preloader} from '@storeworkflows/ui-kit';

export const TypeSectionPreloader: FC = () => (
	<Fragment>
		<Preloader count={1} flexDirectionGeneral="column" mainStyles={{backgroundColor: 'transparent'}} items={[{repeat: 1, width: '30rem', height: '1.5rem', itemStyles: {justifyContent: 'center', padding: '0 3rem'}, round: true},]}/>
		<Preloader count={1} flexDirectionGeneral="column" mainStyles={{backgroundColor: 'transparent'}} items={[{repeat: 1, width: '8rem', height: '1.5rem', itemStyles: {justifyContent: 'center', padding: '0 3rem'}, round: true},]}/>
		<Preloader count={1} flexDirectionGeneral="column" mainStyles={{backgroundColor: 'transparent'}} items={[{repeat: 3, width: '15.625rem', height: '20rem', itemStyles: {justifyContent: 'space-between', padding: '0 3rem'}, round: true},]}/>
	</Fragment>
);

