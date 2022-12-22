import {IRequest} from '../config/request';
import {TProjectType, TProjectTypePayload} from '../typings/type/TProjectType';

export class TypeService {
	constructor(private readonly request: (params: IRequest) => Promise<any>) {}

	async getTypes () {
		const {data: {result}} = await this.request({
			url: 'x_aaro2_teamwork_type',
			method: 'get',
			params: {
				sysparm_display_value: true,
				sysparm_query: 'active=true^ORDERBYorder'
			}
		});

		return (result as TProjectTypePayload[]).map<TProjectType>((type) => {
			return {
				checked: type.checked,
				color: type.color,
				description: type.description,
				image: type.image,
				label: type.label,
				sysId: type.sys_id
			};
		});
	}
}
