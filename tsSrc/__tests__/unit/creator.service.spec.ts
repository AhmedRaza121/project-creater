import { CreatorService } from '../../services/creator.service';

describe('CreatorService', () => {
  describe('constructor', () => {
    test('When id generator is not function, expect catch the error "Please provide a function for generating id"', () => {
      expect(() => new CreatorService(null as unknown as () => any)).toThrowError(
        'Please provide a function for generating id'
      );
    });
  });

  describe('#generateID', () => {
    test('When isDefaultValue is true, expect id will null', () => {
      const creatorService = new CreatorService(() => '');

      const id = creatorService.generateID({ isDefaultValue: true });

      expect(id).toStrictEqual({ id: null });
    });
    test('When isDefaultValue is false, expect id will be string', () => {
      const creatorService = new CreatorService(() => 'id');

      const id = creatorService.generateID({ isDefaultValue: false });

      expect(id).toStrictEqual({ id: 'id' });
    });
  });
});
