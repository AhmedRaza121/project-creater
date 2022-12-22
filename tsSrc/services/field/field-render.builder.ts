import {FC} from 'react';
import {IRenderBuilder} from '../typings/interfaces';

export class FieldRenderBuilder implements IRenderBuilder{
	private readonly fieldRenderers = new Map<string, FC<Record<string, unknown>>>()

	addRender(type: string, render: FC): this {
		this.fieldRenderers.set(type, render);
		return this;
	}

	addDefaultRender(render: FC): this {
		if (this.fieldRenderers.has('default')) throw new Error('Default render is specified');

		this.fieldRenderers.set('default', render);

		return this;
	}

	getRenderers(): Map<string, FC<Record<string, unknown>>> {
		return this.fieldRenderers;
	}
}
