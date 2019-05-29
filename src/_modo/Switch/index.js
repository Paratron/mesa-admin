import React from 'react';

const Switch = ({value, onChange, enabled = true, className}) => {
	const classNames = ['mdo-switch'];

	if(value){
		classNames.push('mdo-active');
	}

	if(!enabled){
		classNames.push('mdo-disabled');
	}

	if(className){
		classNames.push(className);
	}

	return (
		<div onClick={() => onChange(!value)} className={classNames.join(' ')} />
	);
};

export default Switch;
