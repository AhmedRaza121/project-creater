import {FC} from 'react';

export interface IRenderBuilder {
	addRender(section: string, render: FC): this;

	addDefaultRender(render: FC): this;

	getRenderers(): Map<string, FC>;
}
