import React from 'react';

const Drawer = (props) => {
	const {
		position = 'left',
		open = false,
		onClose,
		children,
		className,
		...rest
	} = props;

	const classNames = ['mdo-drawer', `mdo-pos-${position}`];

	if (className) {
		classNames.push(props.className);
	}

	if(open){
		document.body.classList.add('drawer-open');
		classNames.push('mdo-open');
	} else {
		document.body.classList.remove('drawer-open');
	}

	return <div {...rest} className={classNames.join(' ')} onClick={onClose}>
		<div className="mdo-drawer-content">
			{children}
		</div>
	</div>;
};

export default Drawer;
