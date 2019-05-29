import React from 'react';
import Switch from '../Switch';

const LabeledSwitch = ({value, onChange, enabled = true, className, label, ...rest}) => {
	const classNames = ['mdo-labeled-switch'];

	if(!enabled){
		classNames.push('mdo-disabled');
	}

	if(className){
		classNames.push(className);
	}

	return (
		<div {...rest} className={classNames.join(' ')} onClick={() => onChange(!value)}>
			<Switch value={value} onChange={onChange} />
			<span>{label}</span>
		</div>
	);
};

export default LabeledSwitch;
