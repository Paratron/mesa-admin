import React from 'react';

const AppContent = (props) => {
	const classNames = ['mdo-appContent'];

	const {
		className,
		...rest
	} = props;

	return <div {...rest} className={classNames.join(' ')}></div>;
};

export default AppContent;
