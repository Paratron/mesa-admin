import React from 'react';
import ReactDOM from 'react-dom';

import App from 'src/core/App';

import 'src/_modo/modo.scss';
import 'src/_modo/themes/modern.scss';

import {defineLocalization} from "localize-ui";
import lang from 'src/_locals/de-de';

defineLocalization(lang);

ReactDOM.render(<App />, document.getElementById('root'));
