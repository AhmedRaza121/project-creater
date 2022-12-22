import { createCustomElement } from '@servicenow/ui-core';
import react from '@storeworkflows/ui-renderer-react';

import App from './App';
import styles from './styles/styles.scss';

import type { IComponentConfig } from './typings/interfaces/IComponentConfig';

createCustomElement('aaro2-tw-project-creator', {
  renderer: { type: react },
  view: App,
  styles,
  initialState: {
    user: null,
  },
  properties: {},
} as unknown as IComponentConfig);
