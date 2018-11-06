import { advanceGeneration } from '../grid';
import { ACTIONS } from '../../../constants';

describe('advanceGeneration', () => {
  it(`returns an object with type ${ACTIONS.ADVANCE_GENERATION}`, () => {
    expect(advanceGeneration().type).toBe(ACTIONS.ADVANCE_GENERATION);
  });
});
