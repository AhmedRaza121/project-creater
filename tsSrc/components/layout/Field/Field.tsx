import React, { FC, memo, useEffect, useMemo } from 'react';
import classNames from 'classnames';

import { TRecordFormField } from '../../../services/field/typings/types';
import { fieldRenderers } from '../../../di';
import isEqual from 'react-fast-compare';

interface IField {
  field: TRecordFormField;
  //refCustom?: any
}

export const Field: FC<IField> = memo(
  function Field({ field}) {
    const Renderer = useMemo(() => fieldRenderers.get(field.type), [field]);
    const DefaultRenderer = useMemo(() => fieldRenderers.get('default'), []);

    if (!field.visible) return null;

    const unsupportedFieldProps = {
      ...field,
      readonly: true,
      invalid: true,
      message: [
        {
          content: `Field type ${field.type} not supported`,
          status: 'blue',
        },
      ],
    };

    if (!Renderer) return DefaultRenderer ? <DefaultRenderer {...unsupportedFieldProps} /> : null;

    // useEffect(() =>{
    //     if (refCustom != null) {
    //       let parentElement:any = refCustom.current.parentElement;
    //       let parentElementHeight = parentElement.getBoundingClientRect().height;
    //       let childElementHeight = refCustom.current.getBoundingClientRect().height;

    //       if (childElementHeight > parentElementHeight) {
    //             parentElement.style.overflowY = "scroll";
    //             parentElement.style.overflowX = "hidden";
    //       }

    //     }
    // },[]);

    return (
      <div className={classNames('record-field', field.visible && '--show')}>
        <Renderer {...field} />
      </div>
    );
  },
  (prev, next) => {
    return isEqual(
      {
        value: prev.field.value,
        displayValue: prev.field.displayValue,
      },
      {
        value: next.field.value,
        displayValue: next.field.displayValue,
      }
    );
  }
);
