import { observer } from 'mobx-react-lite';
import { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import canvasState from '../store/canvasState';
import { CONST } from '../Const';

export const ModalPopup = observer ((props: any) => {

	const connectionHandler =  () => {
		const inputData = (usernameRef.current as HTMLInputElement).value;
		if (inputData !== '') {
			canvasState.setuserName((usernameRef.current as HTMLInputElement).value);
			setModalShow(false);
		}

	}

	const usernameRef = useRef<HTMLInputElement>(null);

	const [modalShow, setModalShow] = useState(true);

	return (
		<Modal
			{...props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
			onHide={() => {}}
			show={modalShow}
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Please, enter your name
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p>
					Your session link: {CONST.CLIENTURL}/{canvasState.sessionId}
				</p>
				<input type="text" ref={usernameRef}></input>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={() => {
					connectionHandler();
				}}>Log In</Button>
			</Modal.Footer>
		</Modal>
	);
})