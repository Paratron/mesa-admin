import React from 'react';

const AppHeader = (props) => {
	const classNames = ['mdo-appbar'];

	const {
		className,
		fixed,
		...rest
	} = props;

	if (className) {
		classNames.push(className);
	}

	if(fixed){
		document.body.classList.add('fixed-header');
		classNames.push('mdo-fixed');
	}

	return <div {...rest} className={classNames.join(' ')}>
		<div>
			{props.children}
		</div>
	</div>;
};

export default AppHeader;
