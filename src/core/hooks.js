import {useLocalStorage, useSessionStorage} from "src/core/storageHooks";
import {useConnectionState} from './rpc';
import {createHook} from "src/_datahooks";

let listHooks = {};

const getListHook = (dataKey) => {
	if(listHooks[dataKey]){
		return listHooks[dataKey];
	}

	const hookFunction = createHook(dataKey);

	listHooks[dataKey] = hookFunction;

	return hookFunction;
};

export {
	getListHook,
	useLocalStorage,
	useSessionStorage,
	useConnectionState
}
