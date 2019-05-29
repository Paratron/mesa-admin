import React from 'react';
import {navigate, useRoutes} from 'hookrouter';
import OverviewPage from "src/overview/Page";

export const navigateToDashboard = () => navigate('/');
export const navigateToOverview = (dataKey) => navigate(`/data/${dataKey}`);

export const routes = {
	'/': () => 'Hallo Welt',
	'/data/:key': ({key}) => <OverviewPage dataKey={key} />,
};

/**
 * Performs the routing of the application and will return
 * the workspace component to be rendered.
 */
export const useAppRouter = () => useRoutes(routes);
