import React from 'react';
import ReactDOM from 'react-dom';
import {Dialog, DialogHeader, DialogFooter, DialogBody} from "../Dialog";
import Button from '../Button';

const dummy = document.createElement('div');

const ConfirmApp = (props) => {
	const [visible, setVisible] = React.useState(false);

	const {
		title = 'Are you sure?',
		body,
		btnConfirm = 'Yes',
		btnCancel = 'No',
		onConfirm,
		onCancel,
	} = props;

	React.useEffect(() => {
		setVisible(true);
	}, []);

	const onClose = () => {
		setVisible(false);
		onCancel();
	};

	return (
		<Dialog className="mdo-confirm" visible={visible} onClose={onClose}>
			<DialogHeader>{title}</DialogHeader>
			<DialogBody>{body}</DialogBody>
			<DialogFooter>
				<Button onClick={onConfirm}>{btnConfirm}</Button>
				<Button onClick={onClose}>{btnCancel}</Button>
			</DialogFooter>
		</Dialog>
	);
};

/**
 * Meh
 * @param props
 * @returns {Promise<any>}
 */
const confirm = (props) => new Promise((resolve, reject) => {

	const handleConfirm = () => {
		resolve();
	};

	const handleCancel = () => {
		reject();
	};

	ReactDOM.render(<ConfirmApp props={props} onConfirm={handleConfirm} onCancel={handleCancel}/>, dummy);
});

export default confirm;
