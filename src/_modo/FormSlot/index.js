import React from 'react';
import PropTypes from 'prop-types';

import {FormContext} from '../FormContainer';

const propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
	className: PropTypes.string,
	onFocus: PropTypes.func,
	onBlur: PropTypes.func,
	enabled: PropTypes.bool,
	manual: PropTypes.bool,
	staticLabel: PropTypes.bool,
	childInLabel: PropTypes.bool,
	error: PropTypes.string,
};

const defaultProps = {
	className: '',
	enabled: true,
	manual: false,
	staticLabel: false,
	childInLabel: false,
	error: null,
};

export default class FormSlot extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			hasFocus: false,
		};

		this.focus = null;
		this.blur = null;
		this.prepareChild = (children, restProps, dataKey = '') => {
			if (!this.focus) {
				this.focus = () => {
					if (children.props.onFocus) {
						children.props.onFocus();
					}
					this.setState({hasFocus: true});
				};
				this.blur = () => {
					if (children.props.onBlur) {
						children.props.onBlur();
					}
					this.setState({hasFocus: false});
				};
			}

			const id = restProps.id || 'handler-' + dataKey;

			return React.cloneElement(children, Object.assign({}, restProps, {id, onFocus: this.focus, onBlur: this.blur}));
		};
	}

	render() {
		const classNames = ['mdo-formslot'];

		const {
			children,
			className,
			enabled,
			label,
			name,
			manual,
			staticLabel,
			childInLabel,
			error,
			...restProps
		} = this.props;

		const {
			hasFocus
		} = this.state;

		if (staticLabel) {
			classNames.push('mdo-staticLabel');
		}

		if (!enabled) {
			classNames.push('mdo-disabled');
		}

		if (hasFocus) {
			classNames.push('mdo-focused');
		}

		return (
			<FormContext.Consumer>
				{(context) => {
					if (!context) {
						throw new Error('FormSlot components can only be placed somewhere inside a FormContainer component.');
					}

					const err = context.errors ? context.errors[name] || error : error;
					const val = context.value[name];

					if (err) {
						classNames.push('mdo-has-error');
					}

					if (manual) {
						return children(val, context.changeHandler(name));
					} else {
						const preparedChild = this.prepareChild(
							children,
							Object.assign(restProps, {
								value: context.value[name],
								onChange: context.changeHandler(name)
							}),
							context.nameChain ? context.nameChain + '.' + name : name
						);

						if (val !== undefined && val !== null && val !== '') {
							classNames.push('mdo-filled');
						}

						if (className) {
							classNames.push(className);
						}

						return (
							<div className={classNames.join(' ')}>
								<label className="mdo-formslot-label">
									<span className="mdo-formslot-label-inner">{label}</span>
									{childInLabel && preparedChild}
								</label>
								{!childInLabel && preparedChild}
								<div className="mdo-error">{err}</div>
							</div>
						);
					}
				}}
			</FormContext.Consumer>
		);
	}
}

FormSlot.propTypes = propTypes;
FormSlot.defaultProps = defaultProps;
