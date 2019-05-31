import React from 'react';
import ReactDOM from 'react-dom';

import App from 'src/core/App';

import 'src/_modo/modo.scss';
import 'src/_modo/themes/modern.scss';

import {defineLocalization} from "localize-ui";

import {getLanguageKey} from 'src/_locals/available';

const languageKey = getLanguageKey();

import(`src/_locals/${languageKey}`).then((module) => {
	defineLocalization(module.default);
	ReactDOM.render(<App />, document.getElementById('root'));
});
