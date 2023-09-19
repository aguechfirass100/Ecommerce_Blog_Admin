import { publicRequest, userRequest } from "../requestMethods"
import { loginFailure, loginStart, loginSuccess } from "./userRedux"
import { registerFailure, registerStart, registerSuccess } from "./userRedux"

export const login = async (dispatch, user) => {
    dispatch(loginStart())
    try {
        const res = await publicRequest.post("/auth/login", user)
        dispatch(loginSuccess(res.data))
    } catch (error) {
        dispatch(loginFailure())
    }
}

export const register = async (dispatch, user) => {
    dispatch(registerStart())
    try {
        const res = await publicRequest.post("/auth/register", user)
        dispatch(registerSuccess(res.data))
    } catch (error) {
        dispatch(registerFailure())
    }
}

export const getUserOrders = async (id) => {
    try {
      const res = await userRequest().get(`/orders/find/${id}`);
      //console.log("Response data:", res.data); // Log the response data
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

export const cancelOrder = async (id) => {
  try {
    const res = await userRequest().delete(`/orders/${id}`)
    return res.data
  } catch (error) {
    console.log(error)
  }
}

  export const getProduct = async (productId) => {
    try {
      const res = await userRequest().get(`/products/find/${productId}`);
      const product = res.data;
      return product
    } catch (error) {
      console.log(error);
    }
  };

  export const updateProductsQuantity = async (order) => {
    try {
      const updatedProducts = order.products.map(async (product) => {
        const initialProduct = await getProduct(product.productId);
        const initialQuantity = initialProduct.quantity;
        const updatedQuantity = Math.max(initialQuantity - product.quantity, 0);
        const updatedInStock = updatedQuantity > 0 ? true : false;
  
        await userRequest().put(`/products/${product.productId}`, {
          quantity: updatedQuantity,
          inStock: updatedInStock,
        });
  
        return {
          ...initialProduct,
          quantity: updatedQuantity,
          inStock: updatedInStock,
        };
      });
  
      const updatedProductData = await Promise.all(updatedProducts);
      return updatedProductData;
    } catch (error) {
      console.log(error);
    }
  };



  

