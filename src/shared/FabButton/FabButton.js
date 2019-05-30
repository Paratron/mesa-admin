import React from 'react';

import {
	Button
} from 'src/_modo';

import './FabButton.scss';
// import {getDiff} from "src/pipes/utils/diff";

const getDiff = () => false;

// eslint-disable-next-line
const FabButton = (props) => {
	const {
		original,
		buffer,
		className,
		onClick,
		noGreen,
		...rest
	} = props;

	const classNames = ['fab'];
	const [clicked, setClicked] = React.useState(false);
	const diff = (original && buffer)
		? !!getDiff(original, buffer)
		: props.enabled !== undefined
			? props.enabled
			: true;

	if (className) {
		classNames.push(className);
	}

	if (clicked && !noGreen) {
		classNames.push('clicked');
	}

	const handleClick = () => {
		setClicked(true);

		setTimeout(() => {
			setClicked(false);
		}, 1000);

		if (onClick) {
			onClick();
		}
	};

	return <Button {...rest} enabled={diff} onClick={handleClick} className={classNames.join(' ')}/>;
};

export default FabButton;
