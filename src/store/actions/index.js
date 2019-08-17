import dataFromJson from '../../products.json';

const counter = (function () {
  var count = 0;
  return function () {count += 1; return count}
})();

export function initializeProductAction() {
  console.log(dataFromJson);
  return (dispatch) => {
        let products = dataFromJson.products.map(p =>{
          p.productId = counter();
          return p;
        });
          dispatch({
            type: "INIT_STORE",
            products,
            pricingInfo:dataFromJson.pricingInfo
          });
  };
};

export function editProductAction(data,cb) {
  console.log(data);
  return (dispatch) => {

          dispatch({
            type: "UPDATE_PRODUCT",
            data,
          });
          cb(true);
  };
};
