/* eslint-disable no-undef */
import { expect } from 'chai';

import createLoadingCycle, { REQUEST_STATUS } from './loadingCycle';

describe('#createLoadingCycle', () => {
  it('it should return loadinCycle initialState/reducers for the given resource name', () => {
    const todosLoadingCycle = createLoadingCycle('todos');
    expect(todosLoadingCycle.initialState).to.eql({
      todosStatus: REQUEST_STATUS.IDLE,
      todosError: undefined,
    });
    expect(Object.keys(todosLoadingCycle.reducers)).to.eql([
      'todosIdle',
      'todosLoading',
      'todosSucceeded',
      'todosFailed',
    ]);
  });
});
