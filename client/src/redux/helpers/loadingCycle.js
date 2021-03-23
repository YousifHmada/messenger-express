export const REQUEST_STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCEEDED: 'succeeded',
  FAILED: 'failed',
};

/**
 * Creates loadingCycle reducers/initialState using the given resouce name
 * @param  {String?} name [name of the resource]
 * @return {Object}
 */
function createLoadingCycle(name = 'request') {
  const initialState = {
    [`${name}Status`]: REQUEST_STATUS.IDLE,
    [`${name}Error`]: undefined,
  };
  const reducers = {
    [`${name}Idle`]: (state) => ({ ...state, [`${name}Status`]: REQUEST_STATUS.IDLE }),
    [`${name}Loading`]: (state) => ({ ...state, [`${name}Status`]: REQUEST_STATUS.LOADING }),
    [`${name}Succeeded`]: (state) => ({
      ...state,
      [`${name}Status`]: REQUEST_STATUS.SUCCEEDED,
      [`${name}Error`]: undefined,
    }),
    /**
     * BaseError {
     *    message: String;
     *    status: Number;
     *    metadata?: Any;
     * }
     * @param {BaseError} action [BaseError]
     */
    [`${name}Failed`]: (state, action) => ({
      ...state,
      [`${name}Status`]: REQUEST_STATUS.FAILED,
      [`${name}Error`]: action.payload,
    }),
  };
  return {
    initialState,
    reducers,
  };
}

export default createLoadingCycle;
