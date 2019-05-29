import React from 'react';
import {Button, Drawer} from "src/_modo";
import {useDeclarations, useMetaData} from "src/core/session";

import {__ns} from 'localize-ui';

import "./MainMenu.scss";
import {navigateToOverview} from "src/core/routing";

const __ = __ns('mainMenu');

const processTitle = (inTitle) => {
	if(inTitle.substr(0, 1) === '%'){
		return __(inTitle.substr((1)));
	}
	
	return inTitle;
};

const MainMenu = ({open, onClose}) => {
	const meta = useMetaData();
	const declarations = useDeclarations();

	const menuItems = Object.entries(declarations).map(([key, declaration]) => {
		return {
			key,
			icon: declaration.icon || 'label',
			title: declaration.title || key,
		};
	});

	return (
		<Drawer open={open} onClose={onClose} className="mainMenu">
			<h3>{meta.title}</h3>
			<div className="buttonMenu">
				{menuItems.map(item => (
					<Button
						key={item.key}
						icon={item.icon}
						type={Button.TYPES.MINIMAL}
						onClick={() => navigateToOverview(item.key)}
					>
						{processTitle(item.title)}
					</Button>
				))}
			</div>
		</Drawer>
	);
};

export default MainMenu;
