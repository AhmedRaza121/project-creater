import {TContentType} from '../typings/type/TContentType';

export const CONTENT_TYPE: TContentType[] = [
	{
		label: 'Any',
		type: [''],
		id: 'any'
	},
	{
		label: 'Word (doc,docx)',
		type: ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
		id: 'word'
	},
	{
		label: 'Excel (xls,xlsx)',
		type: ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
		id: 'excel'
	},
	{
		label: 'Image (jpeg,jpg,png,ico,bmp)',
		type: ['image/jpeg', 'image/png', 'image/vnd.microsoft.icon', 'image/bmp'],
		id: 'image'
	},
	{
		label: 'PDF (pdf)',
		type: ['application/pdf'],
		id: 'pdf'
	}
];
