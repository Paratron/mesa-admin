import rpc from './rpc';
import React from 'react';

import {navigate} from 'hookrouter';

const userCache = sessionStorage.getItem('userCache');
let sessionUser = null;
const hookUpdaters = [];
let pointer = 1;

const notifyComponents = () => {
	for (let i = 0; i < hookUpdaters.length; i++) {
		hookUpdaters[i](pointer);
	}
	pointer += 1;
};

if (userCache) {
	sessionUser = JSON.parse(userCache);
}

if (sessionUser && sessionUser.token) {
	const token = sessionUser.token;
	sessionUser = null;
	rpc.emit('user.auth', {token}, (err, data) => {
		if (err) {
			sessionStorage.removeItem('userCache');
			for (let i = 0; i < hookUpdaters.length; i++) {
				hookUpdaters[i](pointer);
			}
			pointer++;
			return;
		}

		window.session = data;
		sessionUser = data;
		notifyComponents();
	});
}

const authenticate = ({mail, password}) => new Promise((resolve, reject) => {
	rpc.emit('user.auth', {mail, password}, (err, data) => {
		if (err) {
			reject(err);
			return;
		}

		sessionUser = data;
		window.session = data;
		sessionStorage.setItem('userCache', JSON.stringify(sessionUser));
		notifyComponents();
		resolve();
	});
});

const logout = () => {
	sessionUser = null;
	sessionStorage.removeItem('userCache');
	notifyComponents();
};

export const useMetaData = () => sessionUser ? sessionUser.discoveryData.metaData : {};
export const useDeclarations = () => sessionUser ? sessionUser.discoveryData.declarations : {};
export const useProcedures = () => sessionUser ? sessionUser.discoveryData.procedures : {};

/**
 * Returns the current session.
 * @returns {{logout: logout, authenticate: authenticate, sessionUser: object}}
 */
export const useSession = () => {
	const [/*update*/, setUpdate] = React.useState(0);

	React.useDebugValue(sessionUser && sessionUser.mail);

	React.useEffect(() => {
		hookUpdaters.push(setUpdate);
		return () => {
			const i = hookUpdaters.indexOf(setUpdate);
			hookUpdaters.splice(i, 1);
		};
	}, []);

	return [
		sessionUser && sessionUser.mail ? sessionUser : null,
		authenticate,
		logout
	];
};

/**
 * Returns if the user has the given right(s).
 * @param rightName
 */
export const useRightCheck = (...rightName) => {
	const hasAll = sessionUser.rights.indexOf('*') !== -1;

	if (rightName.length === 1) {
		if (hasAll) {
			return true;
		}
		return sessionUser.rights.indexOf(rightName[0]) !== -1;
	}

	if (hasAll) {
		return rightName.map(() => true);
	}

	return rightName.map(right => sessionUser.rights.indexOf(right) !== -1);
};

/**
 * Triggers a navigation to the given route, if the given right does not exist on the user.
 * @param {string} rightName
 * @param {string} route
 */
export const useRightBasedNavigation = (rightName, route) => {
	if (!useRightCheck(rightName)) {
		navigate(route);
		return false;
	}
	return true;
};
