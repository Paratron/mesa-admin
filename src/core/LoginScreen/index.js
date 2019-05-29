import React from 'react';
import PropTypes from 'prop-types';

import {__ns} from "localize-ui";
import {useConnectionState, useLocalStorage} from 'src/core/hooks';
import {version} from '../../../package.json';

import {
	VerticallyCentered,
	ButtonArea
} from 'src/_modo/layout';

import {
	Card,
	FormContainer,
	FormSlot,
	TextInput,
	Button,
	Icon,
} from 'src/_modo';

import "./LoginScreen.scss";

const __ = __ns('login');

const propTypes = {
	/** Callback function for when the login button is pressed */
	onLogin: PropTypes.func.isRequired,

	/** An error message to be shown in the form, beneath the e-mail input. */
	errorMail: PropTypes.string,

	/** An error message to be shown in the form, beneath the password input. */
	errorPassword: PropTypes.string,
};

const initMail = () => {
	const win = window.open('mailto:hello@wearekiss.com?subject=PSM Zugang');
	setTimeout(() => win.close(), 100);
};

/**
 * The login screen will provide a card, centered on the screen and invites the user
 * to login via mail and password.
 *
 * @param {function} onLogin
 * @param {string} [errorMail]
 * @param {string} [errorPassword]
 * @param {string} [prefillMail]
 */
const LoginScreen = ({onLogin}) => {
	const isConnected = useConnectionState();
	const [lastLoginMail, setLastLoginMail] = useLocalStorage('lastLoginMail', '');
	const [errors, setErrors] = React.useState({});

	const formDefault = {
		mail: lastLoginMail,
		password: localStorage.getItem('pwd') || '',
	};

	const loginGuard = (data) => {
		setLastLoginMail(data.mail);
		setErrors({});
		onLogin(data).catch(e => {
			if (e.code === 'L06') {
				setErrors({
					password: __('errPassword')
				});
			} else {
				setErrors({
					mail: __('errMail')
				});
			}
		});
	};

	return (
		<VerticallyCentered>
			<Card className={`authCard${isConnected ? '' : ' disabled'}`}>
				<h3>{__('headline')}</h3>
				<FormContainer initValue={formDefault} errors={errors} onSubmit={loginGuard}>
					{({doSubmit}) => (
						<React.Fragment>
							<FormSlot
								name="mail"
								label={__('mail')}
							>
								<TextInput type="mail" autofocus={lastLoginMail === ''} onEnter={doSubmit}/>
							</FormSlot>

							<FormSlot
								name="password"
								label={__('password')}
							>
								<TextInput type="password" autofocus={!!lastLoginMail} onEnter={doSubmit}/>
							</FormSlot>

							<p>
								{__('note')}
							</p>

							<ButtonArea>
								<Button type={Button.TYPES.MINIMAL} onClick={initMail}>{__('btnAdmin')}</Button>
								<Button type={Button.TYPES.PRIMARY} onClick={doSubmit}>{__('btnLogin')}</Button>
							</ButtonArea>
						</React.Fragment>
					)}
				</FormContainer>
			</Card>
			<div className="versionLabel">{__('version', {version})}</div>
			{!isConnected && (
				<div className="connectionMessage">
					<Icon name="warning"/>
					{__('errMissingConnection')}
				</div>
			)}
		</VerticallyCentered>
	);
};

LoginScreen.propTypes = propTypes;

export default LoginScreen;
