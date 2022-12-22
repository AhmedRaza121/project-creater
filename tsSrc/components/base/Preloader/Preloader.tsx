import React, {FC} from 'react';
import {Modal, Preloader} from '@storeworkflows/ui-kit';

export const CreatorPreloader: FC = () => {
	return <Modal
		openModal={true}
		display="flex"
		manageOpened={true}
		animation
	>
		<Modal.Header>
			<div className="modal-header">
				<Preloader
					count={1}
					flexDirectionGeneral="column"
					mainStyles={{backgroundColor: 'transparent'}}
					items={[
						{
							repeat: 7,
							width: '1.5rem',
							height: '1.5rem',
							itemStyles: {justifyContent: 'space-between', padding: '0 3rem'},
							round: true
						},
					]}
				/>
			</div>
		</Modal.Header>

		<Modal.Body>
			<div className="modal-body">
				<Preloader
					count={1}
					flexDirectionGeneral="column"
					mainStyles={{backgroundColor: 'transparent'}}
					items={[
						{
							repeat: 1,
							width: '660px',
							height: '40px',
							itemStyles: {justifyContent: 'center', padding: '0 3rem'},
							round: false
						},
					]}
				/>
				<Preloader
					count={1}
					flexDirectionGeneral="column"
					mainStyles={{backgroundColor: 'transparent'}}
					items={[
						{
							repeat: 1,
							width: '440px',
							height: '32px',
							itemStyles: {justifyContent: 'center', padding: '0 3rem'},
							round: false
						},
					]}
				/>
				<Preloader
					count={1}
					flexDirectionGeneral="column"
					mainStyles={{backgroundColor: 'transparent'}}
					items={[
						{
							repeat: 1,
							width: '200px',
							height: '20px',
							itemStyles: {justifyContent: 'center', padding: '0 3rem'},
							round: false
						},
					]}
				/>
				<Preloader
					count={1}
					flexDirectionGeneral="column"
					mainStyles={{backgroundColor: 'transparent'}}
					items={[
						{
							repeat: 3,
							width: '163px',
							height: '122px',
							itemStyles: {justifyContent: 'space-around', padding: '0 3rem'},
							round: false
						},
					]}
				/>
			</div>
		</Modal.Body>

		<Modal.Footer>
			<div className="modal-footer">
				<Preloader
					count={1}
					flexDirectionGeneral="column"
					mainStyles={{backgroundColor: 'transparent'}}
					items={[
						{
							repeat: 2,
							width: '70.45px',
							height: '32px',
							itemStyles: {justifyContent: 'flex-end'},
							round: false
						},
					]}
				/>
			</div>
		</Modal.Footer>
	</Modal>;
};
