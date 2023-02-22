// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

// Add any needed widget imports here (or from controls)
// import {} from '@jupyter-widgets/base';

import { createTestModel } from './utils';

import { LegoBoostModel } from '..';

describe('Example', () => {
  describe('LegoBoostModel', () => {
    it('should be createable', () => {
      const model = createTestModel(LegoBoostModel);
      expect(model).toBeInstanceOf(LegoBoostModel);
    });
  });
});
