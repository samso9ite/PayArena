import React from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

function NotificationToast(props: any) {
	return (
		<div className="fixed-top">
			<ToastContainer position="top-end" className="p-3">
				<Toast bg={props.title === "Error" ? "danger" : "success"} autohide={true} onClose={props.closeNotif}>
					<Toast.Header>
						<i className={props.title === "Error" ? "ri-information-line me-2" : "ri-checkbox-circle-fill me-2"} />
						<strong className="me-auto">{props.title}</strong>
					</Toast.Header>
					<Toast.Body className={'danger text-white'}>{props.message}</Toast.Body>
				</Toast>
			</ToastContainer>
		</div>
	);
}

export default NotificationToast;