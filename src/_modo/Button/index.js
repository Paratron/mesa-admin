import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon';

const TYPES = {
	DEFAULT: 0,
	PRIMARY: 1,
	MINIMAL: 2,
};

const typeCSS = [
	'mdo-default',
	'mdo-primary',
	'mdo-minimal',
];

const emptyFunc = () => {};

const propTypes = {
	type: PropTypes.number,
	label: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	block: PropTypes.bool,
	children: PropTypes.node,
	title: PropTypes.string,
	enabled: PropTypes.bool,
	className: PropTypes.string,
	onClick: PropTypes.func,
	icon: PropTypes.string,
};

const defaultProps = {
	type: TYPES.DEFAULT,
	label: '',
	children: null,
	title: '',
	enabled: true,
	className: '',
	onClick: emptyFunc,
	icon: undefined,
};

const Button = (props) => {
	const classNames = ['mdo-button'];

	const {
		type,
		label,
		children,
		title,
		enabled,
		className,
		onClick,
		icon,
		block,
		...rest
	} = props;

	classNames.push(typeCSS[type]);

	if(!enabled){
		classNames.push('mdo-disabled');
	}

	if(block){
		classNames.push('mdo-block');
	}

	if(className){
		classNames.push(className);
	}

	const iconElm = icon ? <Icon name={icon} key="icon" /> : null;

	if(icon){
		classNames.push('mdo-has-icon');
	}

	if(!children && !label){
		classNames.push('mdo-only-icon');
	}

	const content = [iconElm, children || label];

	return (
		<button
			{...rest}
			className={classNames.join(' ')}
			title={title}
			tabIndex={enabled ? 0 : -1}
			disabled={!enabled}
			onClick={ enabled ? onClick : undefined}
		>
			{ content }
		</button>
	);
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;
Button.TYPES = TYPES;

export default Button;
