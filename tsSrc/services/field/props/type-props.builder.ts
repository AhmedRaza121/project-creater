import { TMethodType, TPropsCreator } from '../typings/types';

export class TypePropsBuilder {
  private readonly types = new Map<string, TPropsCreator>();

  addProps(type: TMethodType, propsCreator: TPropsCreator): this {
    this.types.set(type, propsCreator);
    return this;
  }

  addDefaultProps(propsCreator: TPropsCreator): this {
    this.addProps('default', propsCreator);
    return this;
  }

  getTypesProp() {
    return this.types;
  }
}
