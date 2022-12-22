import { nanoid } from '@reduxjs/toolkit';
import {
  Input,
  TextArea,
  HtmlEditor,
  LookupField,
  DatePicker,
  FilterCondition,
  Attachment,
} from '@storeworkflows/ui-kit';

import { DistributionSection } from '../components/sections/DistributionSection/DistributionSection';
import { SummarySection } from '../components/sections/SummarySection/SummarySection';
import { WelcomeSection } from '../components/sections/WelcomeSection/WelcomeSection';
import { SectionRenderBuilder } from '../services/section/section-render.builder';
import { TypeSection } from '../components/sections/TypeSection/TypeSection';
import { FieldRenderBuilder } from '../services/field/field-render.builder';
import { getFormModel } from '@storeworkflows/form-logic-generator/lib';
import { SectionService } from '../services/section/section.service';
import SurveySection from '../components/sections/SurveySection';
import { FieldService } from '../services/field/field.service';
import fieldBuilder from '../services/field/field.builder';
import { CreatorService } from '../services/creator.service';
import { Layout } from '../components/layout/Layout/Layout';
import { LayoutService } from '../services/layout.service';
import { FormService } from '../services/form.service';
import { TypeService } from '../services/type.service';
import { ObjectUtil } from '../utils/object.util';
import { now, table } from '../config/request';
import {
  CONDITIONS,
  DATE,
  DATE_TIME,
  FIELD_LOOKUP,
  FILE_ATTACHMENT,
  HTML,
  LIST,
  REFERENCE,
  STRING,
  TEXTAREA,
} from '../constants/FieldType';
import { FieldPropsService } from '../services/field/props/field-props.service';
import { ActionService } from '../services/action.service';
import { SurveyService } from '../services/survey.service';

const sectionRenderers = new SectionRenderBuilder()
  .addRender('welcome', WelcomeSection)
  .addRender('type', TypeSection)
  .addRender('survey', SurveySection)
  .addRender('summary', SummarySection)
  .addRender('distribution', DistributionSection)
  .addDefaultRender(Layout)
  .getRenderers();

const fieldRenderers = new FieldRenderBuilder()
  .addRender(STRING, Input)
  .addRender(TEXTAREA, TextArea)
  .addRender(HTML, HtmlEditor)
  .addRender(REFERENCE, LookupField)
  .addRender(LIST, LookupField)
  .addRender(FIELD_LOOKUP, LookupField)
  .addRender(DATE_TIME, DatePicker)
  .addRender(DATE, DatePicker)
  .addRender(CONDITIONS, FilterCondition)
  .addRender(FILE_ATTACHMENT, Attachment)
  .addDefaultRender(Input)
  .getRenderers();

const fieldService = new FieldService();
const creatorService = new CreatorService(nanoid);
const formService = new FormService(getFormModel, ObjectUtil, fieldBuilder);
const layoutService = new LayoutService(fieldService);
const sectionService = new SectionService(sectionRenderers, layoutService, 0);
const typeService = new TypeService(table);
const fieldTypeProps = new FieldPropsService();
const actionService = new ActionService(now);
const surveyService = new SurveyService(table, 'x_aaro2_teamwork_question');

export {
  formService,
  typeService,
  fieldService,
  layoutService,
  actionService,
  creatorService,
  sectionService,
  fieldTypeProps,
  fieldRenderers,
  surveyService,
};
