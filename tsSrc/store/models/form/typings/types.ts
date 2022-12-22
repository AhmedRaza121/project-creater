import {
  TColumnLayout,
  TFieldComposition,
  TFullLayout,
} from '../../../../typings/type/TSectionLayout';

export type TgSetValue = {
  field: string;
  value: string;
  displayValue: string;
};

export type TRecordFormState = {
  uiActions: TFormAction[];
  isNewRecord: boolean;
  isValidRecord: boolean;
  layouts: TFieldComposition<TFullLayout | TColumnLayout>[][];
  loading: boolean;
  formLoading: boolean;
  error: null | string;
};

export type TFormRecord = {
  table: string;
  sysId: string;
  views: string;
  query: string;
  view: string;
  trueTable: string;
  isWhitelistedForEdit: boolean;
  sys_id: string;
};

export type TFormAction = {
  label: string;
  name: string;
  sysId: string;
  order: number;
  hasClientScript: boolean;
  clientScript: string;
  type: string;
  style: string;
  hint: string;
};

export type TUiActionNodeChildren = {
  sysId: string;
  id: string;
  label: string;
  hint: string;
};

export type TUiActionNode = {
  id: number;
  label: string;
  overflow: boolean;
  color: string;
  type: string;
  children: TUiActionNodeChildren[];
};

export type TConfigItem = {
  order: number;
  label: string;
  url: string;
};

export type TGScratchpad = {
  browserSupported: boolean;
  isNewUI: boolean;
};

export type TGlobals = {
  g_scratchpad: TGScratchpad;
  g_language: string;
  g_date_time_format: string;
  g_decimal_separator: string;
  g_user_grouping: string;
  g_text_direction: string;
  g_is_accessible: boolean;
};

export type TUiPolicy = {
  short_description: string;
  sys_id: string;
  reverse: boolean;
  on_load: boolean;
  is_run_scripts: boolean;
  pre_evaluated: boolean;
  pre_evaluated_result: boolean;
  script_true: unknown;
  script_false: unknown;
};

export type TClientScript = {
  name: string;
  sysId: string;
  script: string;
  type: string;
  fieldName: string;
  tableName: string;
};

export type TOnLoadScript = TClientScript;

export type TOnChangeScript = TClientScript;

export type TOnSubmitScript = TClientScript;

export type TClientScripts = {
  onLoad: TOnLoadScript[];
  onChange: TOnChangeScript[];
  onSubmit: TOnSubmitScript[];
};

export type TModelCond = {
  field: string;
  operator: string;
  value: string;
  newQuery: boolean;
  or: boolean;
};

export type TPayloadMap = {
  name: string;
  value: string;
};

export type TDecFieldAction = {
  name: string;
  icon: string;
  label: string;
  dependency: string;
  requiresValue: boolean;
  order: number;
  conditions: string;
  actionType: string;
  actionComponent: string;
  actionDispatch: string;
  actionPayload: string;
  actionAttributes: string;
  groupBy: boolean;
  group: string;
  assignmentId: string;
  confirmationRequired: boolean;
  confirmationMessage: string;
  tooltip: string;
  modelConditions: TModelCond[];
  payloadMap: TPayloadMap[];
};

export type TSidebarAction = {
  name: string;
  icon: string;
  label: string;
  tooltip: string;
  actionComponent: string;
  actionAttributes: string;
  order: number;
  assignmentId: string;
  modelConditions: TModelCond[];
  payloadMap: [];
};

export type TRecordValue = {
  name: string;
  value: string;
  displayValue: string | null;
  valuesList: string[];
};

export type TFieldAttr = {
  name: string;
  value: string;
};

export type TFieldDictionary = {
  type: string;
  dependentField: string | null;
  dependentTable: string | null;
  name: string;
  label: string;
  canWrite: boolean;
  canRead: boolean;
  canCreate: boolean;
  internalType: string;
  isMandatory: boolean;
  sys_readonly: boolean;
  attributes: TFieldAttr[];
};

type TFieldMessage = {
  message: string;
  type: 'error' | 'info';
};

export type TBasicField = {
  name: string;
  dictionary: TFieldDictionary;
  messages: TFieldMessage[];
};

export type TStringField = {
  maxLength: number;
  defaultRows: number | null;
};

export type TChoice = {
  displayValue: string;
  value: string;
};

export type TChoiceField = {
  choices: TChoice[];
};

export type TReferenceField = {
  reference: string;
  referenceQualifier: string;
  referenceKey: string;
  useReferenceQualifier: string;
  dependent: string;
  dependentOnField: string;
  refAutoCompleter: string;
  refAcOrderBy: string;
  refAcColumns: string;
  refAcColumnsSearch: boolean;
  refAcDisplayValue: boolean;
  refQualElements: string;
  refContributions: string;
  isDynamicCreate: boolean;
  isReferenceScriptableTable: boolean;
  referenceError: string | null;
};

export type TGlideDateField = unknown;

export type THTMLField = TStringField;

export type TTableNameField = {
  displayValue: string;
};

export type TGlideListField = {
  reference: string;
};

export type TConditionField = TStringField;

export type TFileAttachment = {
  value: string | null;
  displayValue: string;
  state: unknown;
  contentType: string | null;
};

export type TFieldElement = TBasicField &
  (
    | TStringField
    | TChoiceField
    | TReferenceField
    | TGlideDateField
    | THTMLField
    | TTableNameField
    | TGlideListField
    | TConditionField
    | TFileAttachment
  );

export type TRow = {
  fields: string[];
};

export type TSectionRow = TRow[];

export type TFormSection = {
  sysId: string;
  caption: string;
  captionDisplay: string;
  id: number;
  label: string;
  defaultSection: boolean;
  expanded: boolean;
  rows: TSectionRow[];
  visible?: boolean;
};

export type TFieldState = {
  name: string;
  hidden: boolean;
  mandatory: boolean;
  readonly: boolean;
};

export type TFieldValue = {
  type: string;
  label: string;
  visible: boolean;
  readonly: boolean;
  mandatory: boolean;
  dependentField: string;
  dependentTable: string;
  referringTable: string;
  referringRecordId: string;
  value: string;
  displayValue: string;
  valuesList: string[];
  display_value_list: string[];
  sys_readonly: boolean;
  reference: string;
  originalValue: string;
};

export type TFormFieldValue = TFieldElement & TFieldValue;

export type TFormField = TFormFieldValue;

export type TSessionMessage = {
  type: 'error' | 'info';
  message: string;
};

export type TUserPreference = {
  name: string;
  value: string;
};

export type TGroup = {
  groupId: string;
  name: string;
};

export type TFieldValidator = {
  internalType: string;
  script: string;
  description: string;
  fields: string[];
};

export type TFormData = {
  isReadOnly: boolean;
  isMissingWorkspaceView: boolean;
  uiDomain: unknown;
  record: TFormRecord;
  workspaceConfigId: string;
  uiActions: {
    formActions: TFormAction[];
    uiActionNodes: TUiActionNode[];
    configurationItem: TConfigItem;
    messages: Record<string, string>;
  };
  environment: {
    globals: TGlobals;
    uiPolices: TUiPolicy[];
    clientScripts: TClientScripts;
    messages: Record<string, string>;
  };
  declarativeUIActions: {
    declarativeFieldActions: Record<string, TDecFieldAction[]>;
  };
  formActions: {
    relatedItems: [];
    sidebarActions: TSidebarAction[];
    configurationItems: TConfigItem[];
  };
  layout: {
    isValidRecord: boolean;
    isNewRecord: boolean;
    canReadRecord: boolean;
    isTemplateComponentEnabled: string;
    sysId: string;
    encodedRecord: string;
    recordValues: TRecordValue[];
    fieldElements: TFieldElement[];
    baseTable: string;
    table: string;
    isScriptableTable: boolean;
    lastErrorMessage: string;
    domainSeparation: string | null;
    formatters: Record<string, unknown>;
    showVariableEditor: boolean;
    sections: TFormSection[];
    relatedLists: unknown[];
    fieldStates: Record<string, TFieldState>;
    formFieldValues: Record<string, TFormFieldValue>;
    formFields: TFormField[];
    formTabs: {
      isDefaultTabOrder: boolean;
      defaultTabFocus: string | null;
      tabsOrder: number[];
    };
    formSettings: {
      isDetailsHidden: boolean;
      isSectionMenuHidden: boolean;
      isSectionCollapseDisabled: boolean;
      defaultSection: string | number | null;
    };
    configurationItems: TConfigItem[];
  };
  currentUser: {
    user: TUserPreference[];
    roles: string[];
    allRoles: string[];
    groups: string[];
    groupList: TGroup[];
    sys_id: string;
    userName: string;
    firstName: string;
    lastName: string;
    title: string;
    avatar: string;
    departmentId: string;
    email: string;
    userId: string;
  };
  dataLookup: {
    fields: unknown[];
  };
  validationScripts: {
    fieldValidators: TFieldValidator[];
  };
  session: {
    messages: TSessionMessage[];
  };
};
