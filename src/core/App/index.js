import React from 'react';
import {useMetaData, useSession} from "src/core/session";
import LoginScreen from "src/core/LoginScreen";
import {AppHeader, AppContent, Cell, FullScreenApp, Grid} from "src/_modo/layout";
import {Button} from "src/_modo";

import "./App.scss";
import MainMenu from "src/core/MainMenu";
import {useAppRouter} from "src/core/routing";

const App = () => {
	const routeResult = useAppRouter();
	const [menuOpen, setMenuOpen] = React.useState(false);
	const [session, authenticate] = useSession();
	const meta = useMetaData();

	if (!session) {
		return <LoginScreen onLogin={authenticate}/>;
	}

	const userLabel =
		(session.firstName || session.lastName)
			? `${session.firstName} ${session.lastName}`.trim()
			: session.mail;

	return (
		<FullScreenApp>
			<MainMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
			<AppHeader>
				<Grid>
					<Cell className="titleCell">
						<Button icon="menu" type={Button.TYPES.MINIMAL} onClick={() => setMenuOpen(true)}/>
						<h1>{meta.title}</h1>
					</Cell>
					<Cell textAlign="right">
						<Button icon="account_circle" type={Button.TYPES.MINIMAL}>
							{userLabel}
						</Button>
					</Cell>
				</Grid>
			</AppHeader>
			<AppContent>
				{routeResult}
			</AppContent>
		</FullScreenApp>
	);
};

export default App;
