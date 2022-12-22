export type TProjectType = {
	checked: boolean,
	color: string,
	description: string,
	image: string,
	label: string,
	sysId: string
}

export type TProjectTypePayload = {
	'image': string,
	'color': string,
	'first_response': string,
	'show_feedback': string,
	'sys_mod_count': string,
	'active': string,
	'description': string,
	'label': string,
	'sys_updated_on': string,
	'sys_tags': string,
	'sys_id': string,
	'sys_updated_by': string,
	'task': string,
	'sys_created_on': string,
	'checked': boolean,
	'flow': {
		'display_value': string,
		'link': string
	},
	'sys_created_by': string,
	'order': string
}
