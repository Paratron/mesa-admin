import React from 'react';
import {useDeclarations} from "src/core/session";
import {__ns} from 'localize-ui';
import {navigateToDashboard} from "src/core/routing";
import {Card, GridFrame, Table} from "src/_modo";

import "./Page.scss";

const __ = __ns('overview');
const __f = __ns('fieldNames');

let tableDefs = {};

const getTableDef = (dataKey, declaration) => {
	if (tableDefs[dataKey]) {
		return tableDefs[dataKey];
	}

	const fields = (declaration.autoFields || []).concat(Object.keys(declaration.fields));

	let def = {};

	fields.forEach(field => {
		def[field] = {
			title: declaration.fieldNames ? declaration.fieldNames[field] || __f(field) : __f(field)
		};
	});

	tableDefs[dataKey] = def;

	return def;
};

const OverviewPage = ({dataKey}) => {
	const declarations = useDeclarations();

	const declaration = declarations[dataKey];

	if (!declaration) {
		navigateToDashboard();
		return null;
	}

	return (
		<GridFrame className="overviewPage">
			<h3>{__('title', {name: declaration.title || dataKey})}</h3>
			<Card>
				<Table>{getTableDef(dataKey, declaration)}</Table>
			</Card>
		</GridFrame>
	);
};

export default OverviewPage;
