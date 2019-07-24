import React from 'react';
import {useDeclarations} from "src/core/session";
import {__ns} from 'localize-ui';
import {navigateToDashboard} from "src/core/routing";
import {Card, GridFrame, Table} from "src/_modo";

import "./Page.scss";
import FabButton from "src/shared/FabButton/FabButton";
import {getListHook} from "src/core/hooks";
import OverviewError from "src/overview/Error";
import OverviewLoader from "src/overview/Loader";
import OverviewEmpty from "src/overview/Empty";

const __ = __ns('overview');
const __f = __ns('fieldNames');

let tableDefs = {};

/**
 adminOverview: {
		id: true,
		creationTime: true,
		modificationTime: true,
		title: {
			title: 'Link Titel',
			sortable: true
		},
		url: {
			title: 'Linkziel',
			component: 'Link'
		}
	}
 */

/**
 * This function generates a table definition object
 * @param {string} dataKey
 * @param {object} declaration
 * @returns {*}
 */
const getTableDef = (dataKey, declaration) => {
	if (tableDefs[dataKey]) {
		return tableDefs[dataKey];
	} else {
		const fieldSet = declaration.adminOverview
			? declaration.adminOverview
			// eslint-disable-next-line
			: ((declaration.autoFields || []).concat(Object.keys(declaration.fields))).reduce((acc, val) => (acc[val] = true, acc), {});

		Object.entries(fieldSet).forEach(([key, value]) => {
			if(value === true){
				fieldSet[key] = {
					title: __f(key)
				};
			}
		});

		tableDefs[dataKey] = fieldSet;

		return fieldSet;
	}
};

const OverviewPage = ({dataKey}) => {
	const useList = getListHook(dataKey);
	const [listItems, listStatus] = useList();
	const declarations = useDeclarations();

	const declaration = declarations[dataKey];

	if (!declaration) {
		navigateToDashboard();
		return null;
	}

	let content = null;

	if(listStatus.error){
		content =  <OverviewError error={listStatus.error} />
	}

	if(listStatus.loading){
		content = <OverviewLoader />;
	}

	if(!content){
		if(!listItems || listItems.length === 0){
			content = <OverviewEmpty />;
		} else {
			content = <Table data={listItems}>{getTableDef(dataKey, declaration)}</Table>;
		}
	}

	return (
		<GridFrame className="overviewPage">
			<h3>{__('title', {name: declaration.title || dataKey})}</h3>
			<FabButton icon="add" title={__('fabAddLabel', {title: declaration.title || dataKey})}/>
			<Card>
				{content}
			</Card>
		</GridFrame>
	);
};

export default OverviewPage;
