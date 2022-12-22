import {IRenderBuilder} from '../typings/interfaces';
import {TSectionRenders} from '../typings/types';
import {FC} from 'react';

export class SectionRenderBuilder implements IRenderBuilder {
	private readonly sectionRenders: TSectionRenders = new Map();

	addRender(section: string, render: FC): this {
		this.sectionRenders.set(section, render);
		return this;
	}

	addDefaultRender(render: FC): this {
		this.addRender('default', render);
		return this;
	}

	getRenderers() {
		return this.sectionRenders;
	}
}
