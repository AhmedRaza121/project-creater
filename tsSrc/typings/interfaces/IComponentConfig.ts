import type {ComponentConfig} from '@servicenow/ui-core';

export interface IComponentConfig extends ComponentConfig {
    renderer: {
        type: any
    }
}
