import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';
import List from '../List';
import Card from '../Card';

const propTypes = {
	items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
	value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	renderButtonLabel: PropTypes.func,
	onChange: PropTypes.func,
	className: PropTypes.string,
	enabled: PropTypes.bool,
    placeholder: PropTypes.string,
};

const defaultProps = {
	renderButtonLabel: (value, items) => items[value],
	onChange: () => {
	},
	enabled: true,
    placeholder: ''
};

/**
 * Travels up the DOM tree, beginning with the given node.
 * Returns `true` when a node with the given class name is hit.
 * Returns false, if no more parent nodes exist.
 * @param {Node} node
 * @param {string} className
 * @returns {boolean}
 */
const travelUp = (node, className) => {
	if (node.classList && node.classList.contains(className)) {
		return true;
	}
	if (node.parentNode) {
		return travelUp(node.parentNode, className);
	}
	return false;
};

export const handleListClick = (onChange, setDropDownOpen) => (index) => {
	if (onChange) {
		onChange(index);
	}
	setDropDownOpen(false);
};

export const handleButtonClick = (dropdownOpen, setDropdownOpen) => () => {
	setDropdownOpen(!dropdownOpen);
};

const DropDown = (props) => {
	const [dropDownOpen, setDropDownOpen] = React.useState(false);

	React.useEffect(() => {
	    const clickHandler = (e) => {
	        if(travelUp(e.target, 'mdo-dropdown')){
	            return;
            }
	        setDropDownOpen(false);
        };

	    window.addEventListener('click', clickHandler);

	    return () => {
	        window.removeEventListener('click', clickHandler);
        };
    });

	const {
		items,
		value,
		onChange,
		className,
		renderButtonLabel,
		enabled,
        placeholder,
		...rest
	} = props;

	const classNames = ['mdo-dropdown'];

	if (dropDownOpen) {
		classNames.push('mdo-open');
	}

	if (!enabled) {
		classNames.push('mdo-disabled');
	}

	if (className) {
		classNames.push(className);
	}

	return (
		<div {...rest} className={classNames.join(' ')}>
			<Button
				enabled={enabled}
				onClick={handleButtonClick(dropDownOpen, setDropDownOpen)}
			>
				{renderButtonLabel(value, items) || placeholder}
			</Button>
			<i className="material-icons">
				arrow_drop_down
			</i>
			<Card>
				<List items={items} onChange={handleListClick(onChange,setDropDownOpen)} />
			</Card>
		</div>
	);
};

DropDown.propTypes = propTypes;
DropDown.defaultProps = defaultProps;

export default DropDown;
