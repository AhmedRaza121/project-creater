export type TField = {
    field: string,
    value: string
}

export type TID = {
    id: any
}

export type TCreatorState = {
    table: string,
    sysId: string,
    views: 'Modal',
    opened: boolean,
    query: '',
    fields: TField[],
    id: TID,
    workspaceConfigId: ''
}
