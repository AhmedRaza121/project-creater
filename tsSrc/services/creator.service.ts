import { ICreatorService } from '../typings/interfaces/ICreatorService';
import { TID } from '../store/models/creator/typings/types';
import { TIDGenerator } from '../typings/type/TIDGenerator';

export class CreatorService implements ICreatorService {
  private readonly defaultID = null;

  constructor(private readonly idGenerator: TIDGenerator) {
    this.checkOrGeneratorIsFunction();
  }

  generateID({ isDefaultValue }: { isDefaultValue: boolean }): TID {
    return { id: isDefaultValue ? this.defaultID : this.idGenerator() };
  }

  private checkOrGeneratorIsFunction() {
    if (typeof this.idGenerator !== 'function') {
      throw new Error('Please provide a function for generating id');
    }
  }
}
