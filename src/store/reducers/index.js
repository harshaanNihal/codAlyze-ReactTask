
const INIT_STATE = {
  products: [],
  pricingInfo: {},
};


export default function rootReducer(state = INIT_STATE, action) {
  const { products, pricingInfo, type, data } = action
  switch (type) {
    // case value:
    case 'INIT_STORE': 
      return {
        ...state,
        products,
        pricingInfo,
      }

    case 'UPDATE_PRODUCT': 
      return {
        ...state,
        products: [...state.products].map(v => {
          if (data.productId == v.productId) {
            return { ...action.data };
          } else {
            return v;
          }
        })
      }

    default:
      return state;
  }
}