import ioClient from 'socket.io-client';
import React from 'react';
import {registerFetchResponder} from "src/_datahooks";

const ioAddress = `//${window.location.hostname}`
	+ (
		window.location.hostname !== 'localhost'
			? `:${window.location.port}`
			: ':1337'
	);

const io = ioClient(ioAddress);
let socket = null;
const emitQueue = [];
let isConnected = false;
const connectionWatchers = [];

let listeners = {};

export function useConnectionState() {
	const [connected, setConnected] = React.useState(isConnected);

	if (connectionWatchers.indexOf(setConnected) === -1) {
		connectionWatchers.push(setConnected);
	}

	return connected;
}

io.on('connect', function () {
	console.log('Websocket connected');
	socket = this;
	isConnected = true;
	connectionWatchers.forEach(w => w(true));

	if (emitQueue.length) {
		console.log('Sending emit queue');
		emitQueue.forEach(e => socket.emit(e[0], e[1], e[2]));
	}

	socket.on('rpc', (payload, serverCB) => {
		const {
			method,
			data
		} = payload;

		console.log('<<<', method, data);

		if (listeners[method]) {
			listeners[method].forEach(cb => cb(data, serverCB));
		}

		if (listeners['*']) {
			listeners['*'].forEach(cb => cb(method, data));
		}
	});
});

io.on('disconnect', () => {
	isConnected = false;
	connectionWatchers.forEach(w => w(false));
});

const rpc = {
	emit: (procedure, args, cb) => {
		const capsule = function (response) {
			console.log('<<<', procedure, arguments);
			if (!cb) {
				return;
			}

			const err = response.error ? {code: response.error.substr(0,3), message: response.error.substr(5)} : undefined;
			const data = response.ok;

			cb.apply(socket, [err, data]);
		};

		if (socket) {
			console.log('>>>', 'rpc', {procedure, args}, !!cb);
			socket.emit('rpc', {procedure, args}, capsule);
			return rpc;
		}
		emitQueue.push(['rpc', {procedure, args}, capsule]);
	},
	on: (event, cb) => {
		listeners[event] = listeners[event] || [];
		listeners[event].push(cb);
	}
};

registerFetchResponder((type, id) => new Promise((resolve, reject) => {
	if(!id){
		rpc.emit(`${type}.list`, null, (result) => {
			if(result.ok){
				resolve(result.ok);
				return;
			}
			reject(result.error);
		});
		return;
	}

	rpc.emit(`${type}.fetch`, {id}, (result) => {
		if(result.ok){
			resolve(result.ok);
			return;
		}
		reject(result.error);
	});
}));

export default rpc;
