import React from 'react';
import ReactDOM from 'react-dom';

const portalRoot = document.createElement('div');
portalRoot.setAttribute('id', 'mdo-dialog-portal');
document.body.appendChild(portalRoot);

const Dialog = ({visible = false, children, onClose}) => {
	const classNames = ['mdo-dialog'];

	if(visible){
		classNames.push('mdo-visible');
		portalRoot.classList.add('used');
	} else {
		portalRoot.classList.remove('used');
	}

	return ReactDOM.createPortal((
		<div className={classNames.join(' ')} onClick={onClose}>
			<div className="mdo-dialog-window">
				{children}
			</div>
		</div>
	), portalRoot);
};

export default Dialog;
