import { TFormAction } from '../store/models/form/typings/types';
import { IRequest } from '../config/request';
import { IActionService } from '../typings/interfaces/IActionService';
//import { notesVariable } from './variables.setup';

export class ActionService implements IActionService {
  constructor(private readonly request: (params: IRequest) => Promise<any>) {}

  async runInUiAction(action: TFormAction | undefined, sysId?: string): Promise<any> {
    if (!action) throw new Error('Please provide action');
    let formData = window.g_form.serialize();
    console.log("Before Serialize");
    console.log(formData);
    let notesArray = formData.filter((objData: any) => objData.name == "notes");
    var windowObject: any = window;
    if (notesArray.length > 0 ) {
      if(notesArray[0].liveUpdate == undefined) {
        windowObject["notesValue"] = notesArray[0].value;
        //localStorage.setItem("notes_field_value", notesArray[0].value);
      } else {
        window.g_form.setValue("notes", windowObject["notesValue"]);
      }
    }

    console.log("After Serialize");
    console.log(window.g_form.serialize());
    return await this.request({
      method: 'post',
      url: `ui/ui_action/${action.sysId}`,
      params: {
        sysparm_table: window.g_form.getTableName(),
        sysparm_sys_id: sysId ?? window.g_form.getUniqueValue(),
      },
      data: {
        encodedRecord: window.g_form.getEncodedRecord(),
        fields: window.g_form.serialize(),
      },
    });
  }
}
