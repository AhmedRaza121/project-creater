import React, { FC, Fragment, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

import {
  TColumnLayout,
  TFieldComposition,
  TFullLayout,
} from '../../../typings/type/TSectionLayout';
import { useDeepSelector } from '../../../utils/useDeepSelector';
import { IStore } from '../../../store/typing/interfaces';
import { FullLayout } from './FullLayout';
import { ColumnLayout } from './ColumnLayout';

export const Layout: FC = () => {
  const currentSectionIndex = useSelector<IStore, number>(
    (state) => state.section.currentSectionIndex
  );
  const sectionLayout = useDeepSelector<IStore, TFieldComposition<TFullLayout | TColumnLayout>[]>(
    (state) => state.form.layouts[currentSectionIndex]
  );

  //const recordFormRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  return (
    <Fragment>
      {sectionLayout.map((field, index) => (
        <div className="record-form" key={`form-${field.layout}-${index}`}>
          {field.layout === 'full' && <FullLayout fields={field.fields} />}
          {field.layout === 'column' && <ColumnLayout left={field.left} right={field.right} />}
        </div>
      ))}
    </Fragment>
  );
};
