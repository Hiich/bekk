const initialState = {
  loading: false,
  totalSupply: 0,
  cost: 0,
  payees: 0,
  error: false,
  errorMsg: '',
}

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHECK_DATA_REQUEST':
      return {
        ...state,
        loading: true,
        error: false,
        errorMsg: '',
      }
    case 'CHECK_DATA_SUCCESS':
      return {
        ...state,
        loading: false,
        // totalSupply: action.payload.totalSupply,
        // paused: action.payload.paused,
        // whitelist : action.payload.whitelist,
        // cost: action.payload.cost,
        error: false,
        errorMsg: '',
      }
    case 'CHECK_DATA_FAILED':
      return {
        ...initialState,
        loading: false,
        error: true,
        errorMsg: action.payload,
      }
    default:
      return state
  }
}

export default dataReducer
