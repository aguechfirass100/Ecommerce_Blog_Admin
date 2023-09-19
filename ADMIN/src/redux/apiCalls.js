import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods";
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
  addProductFailure,
  addProductStart,
  addProductSuccess,
  emptyFieldFailure,
  fieldTypeFailure,
} from "./productRedux";
import {
    deleteUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    updateUserFailure,
    updateUserStart,
    updateUserSuccess,
    getUsersFailure,
    getUsersStart,
    getUsersSuccess,
    addUserFailure,
    addUserStart,
    addUserSuccess,
  } from "./userRedux";
  import {
    getArticleFailure,
    getArticleStart,
    getArticleSuccess,
    deleteArticleFailure,
    deleteArticleStart,
    deleteArticleSuccess,
    updateArticleFailure,
    updateArticleStart,
    updateArticleSuccess,
    addArticleFailure,
    addArticleStart,
    addArticleSuccess,
  } from "./articleRedux"
  import { addOrderToArchive } from "./archiveRedux"

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/products");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    const res = await userRequest.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

// update

export const updateProduct = async (id, product, dispatch) => {
  
  dispatch(updateProductStart()); 
  console.log("product updated start")

  // const emptyInputs = Object.entries(product).filter(([key, value]) => {
  //   return typeof value === 'string' && value.trim() === '';
  // });

  // const invalidTypes = Object.entries(product).filter(([key, value]) => {
  //   if (
  //     (key === 'title' && typeof value !== 'string') || 
  //     (key === 'desc' && typeof value !== 'string') ||
  //     (key === 'img' && typeof value !== 'string') || 
  //     (key === 'categories' && !Array.isArray(value)) || 
  //     (key === 'price' && (typeof value !== 'number' || isNaN(value))) 
  //   ) {
  //     return true; 
  //   } else {
  //     return false; 
  //   }
  // });


  // if (emptyInputs.length > 0) {
  //   dispatch(emptyFieldFailure()); 
  // }
  // else if (invalidTypes.length > 0) {
  //   dispatch(fieldTypeFailure());}
  // else {
    try {
      const res = await userRequest.put(`/products/${id}`, product); 
      dispatch(updateProductSuccess({ id, product }));
      console.log("product updated")
    } catch (err) {
      dispatch(updateProductFailure());
      console.log("product updated error")
    }
  }



// export const addProduct = async (product, dispatch) => {
//   dispatch(addProductStart());
  
//   const keys = ["img", "title", "desc", "price", "categories"];

//   const checkKeysExist = (product, keys) => {
//     for (const key of keys) {
//       if (!product.hasOwnProperty(key)) {
//         console.log(key)
//         return false;
//       }
//     }
//     return true;
//   };

//   const keysExist = checkKeysExist(product, keys);

//   console.log("keys exist", keysExist)

//   const validateProductInputs = (product) => {
//     const errors = {};
  
//     if (typeof product.title !== "string") {
//       errors.title = "Title must be a string.";
//     }
  
//     if (typeof product.desc !== "string") {
//       errors.desc = "Description must be a string.";
//     }
  
//     if (typeof product.img !== "string") {
//       errors.img = "Image URL must be a string.";
//     }
  
//     if (!Array.isArray(product.categories)) {
//       errors.categories = "Categories must be an array.";
//     }
  
//     if (typeof product.price !== "number" || isNaN(product.price)) {
//       errors.price = "Price must be a number.";
//     }
  
//     return errors;
//   };

//   const errors = validateProductInputs(product);
//   console.log(errors)

//   const getObjectLength = (obj) => {
//     return Object.keys(obj).length;
//   };

//   const errorsLength = getObjectLength(errors)
//   console.log(errorsLength);

//   try {
//     const res = await userRequest.post(`/products`, product);
//     dispatch(addProductSuccess(res.data));
//   } catch (err) {
//     if(!keysExist) {dispatch(emptyFieldFailure())}
//     if(errorsLength > 0) {dispatch(fieldTypeFailure())}
//     if(keysExist && errorsLength < 0) {dispatch(addProductFailure())}
//   }
// };

export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());

  const keys = ["img", "title", "desc", "price", "categories", "quantity"];

  const checkKeysExist = (product, keys) => {
    for (const key of keys) {
      if (!product.hasOwnProperty(key)) {
        console.log(key);
        return false;
      }
    }
    return true;
  };

  const keysExist = checkKeysExist(product, keys);

  console.log("keys exist", keysExist);

  const validateProductInputs = (product) => {
    const errors = {};
  
    if (typeof product.title !== "string") {
      errors.title = "Title must be a string.";
    }
  
    if (typeof product.desc !== "string") {
      errors.desc = "Description must be a string.";
    }
  
    if (typeof product.img !== "string") {
      errors.img = "Image URL must be a string.";
    }
  
    if (!Array.isArray(product.categories)) {
      errors.categories = "Categories must be an array.";
    }
  
    if (typeof product.price !== "number" || isNaN(product.price)) {
      errors.price = "Price must be a number.";
    }
  
    if (typeof product.quantity !== "number" || isNaN(product.quantity)) {
      errors.quantity = "Quantity must be a number.";
    }
  
    return errors;
  };

  const errors = validateProductInputs(product);
  console.log(errors);

  const getObjectLength = (obj) => {
    return Object.keys(obj).length;
  };

  const errorsLength = getObjectLength(errors);
  console.log(errorsLength);

  try {
    const res = await userRequest.post(`/products`, product);
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    if (!keysExist) {
      dispatch(emptyFieldFailure());
    }
    if (errorsLength > 0) {
      dispatch(fieldTypeFailure());
    }
    if (keysExist && errorsLength === 0) {
      dispatch(addProductFailure());
    }
  }
};



export const getUsers = async (dispatch) => {
    dispatch(getUsersStart());
    try {
      const res = await userRequest.get("/users");
      dispatch(getUsersSuccess(res.data));
      console.log(res.data);
    } catch (err) {
      dispatch(getUsersFailure());
    }
  };
  
  export const deleteUser = async (id, dispatch) => {
    dispatch(deleteUserStart());
    try {
      const res = await userRequest.delete(`/users/${id}`);
      dispatch(deleteUserSuccess(id));
    } catch (err) {
      dispatch(deleteUserFailure());
    }
  };
  
  // export const updateUser = async (id, user, dispatch) => {
  //   dispatch(updateUserStart());
  //   try {
  //     const res = await userRequest.put(`/users/${id}`, user);
  //     dispatch(updateUserSuccess(res.data));
  //   } catch (err) {
  //     dispatch(updateUserFailure());
  //   }
  // };
  
  export const addUser = async (user, dispatch) => {
    dispatch(addUserStart());
    try {
      const res = await userRequest.post(`/users`, user);
      dispatch(addUserSuccess(res.data));
    } catch (err) {
      dispatch(addUserFailure());
    }
  };


  //          //Articles\\        \\

  export const getArticles = async (dispatch) => {
    dispatch(getArticleStart());
    try {
      const res = await publicRequest.get("/articles");
      dispatch(getArticleSuccess(res.data));
    } catch (err) {
      dispatch(getArticleFailure());
    }
  };

  export const deleteArticle = async (id, dispatch) => {
    dispatch(deleteArticleStart());
    try {
      const res = await userRequest.delete(`/articles/${id}`);
      dispatch(deleteArticleSuccess(id));
    } catch (err) {
      dispatch(deleteArticleFailure());
    }
  };

  export const updateArticle = async (id, article, dispatch) => {
    dispatch(updateArticleStart());
    try {
      console.log('Updating article:', id, article)
      const res = await userRequest.put(`/articles/${id}`, article);
      dispatch(updateArticleSuccess({ id, article }));
    } catch (err) {
      console.log('error article:', id, err)
      dispatch(updateArticleFailure());
    }
  };

  export const addArticle = async (article, dispatch) => {
    dispatch(addArticleStart());
    try {
      const res = await userRequest.post(`/articles`, article);
      dispatch(addArticleSuccess(res.data));
    } catch (err) {
      dispatch(addArticleFailure())
    }
  };


   //          //Suggested Articles\\        \\

   export const getSuggestedArticles = async () => {
    try {
      const res = await publicRequest.get("/suggestedArticles");
      return res.data
    } catch (err) {
      console.log(err)
    }
  };

  export const deleteSuggestedArticle = async (id) => {
    try {
      const res = await userRequest.delete(`/suggestedArticles/${id}`);
    } catch (err) {
      console.log(err)
    }
  };

  // Accept a suggested article and convert it to a regular article
  export const acceptSuggestedArticle = async (id) => {
    try {
      console.log("id: ", id)
      const res = await userRequest.post(`/suggestedArticles/acceptSuggestedArticle/${id}`);
      return res.data
    } catch (err) {
      console.log(err)
    }
  }


  //          //Archive\\        \\

  export const addToArchive = async (order, dispatch) => {
    try {
      const res = await userRequest.post(`/archive`, order);
      dispatch(addOrderToArchive(order))
      console.log(res.data)
      return res.data
    } catch (err) {
      console.log(err)
    }
  }

  export const getArchive = async () => {
    try {
      const res = await userRequest.get(`/archive`);
      return res.data
    } catch (err) {
      console.log(err)
    }
  }