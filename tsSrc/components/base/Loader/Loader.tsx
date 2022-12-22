import React, {FC, Fragment} from 'react';
import {useSelector} from 'react-redux';
import {IStore} from '../../../store/typing/interfaces';

export const Loader: FC<{children: JSX.Element}> = ({children}) => {
	const loading = useSelector<IStore, boolean>(state => state.form.formLoading);

	return <Fragment>
		{loading && <div className='prc-loader'>
			<div className='prc-loader--overflow'/>
			<div className='prc-loader--container'>
				<div className="lds-ring">
					<div/>
					<div/>
					<div/>
					<div/>
				</div>
				<span>Loading...</span>
			</div>
		</div>
		}
		{children}
	</Fragment>;
};
