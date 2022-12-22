export interface ITypeProps {
	sysId: string,
	checked: boolean,
	image: string,
	label: string,
	description: string,
	className: string
	setChecked: (sysId: string, label: string) => void
}
