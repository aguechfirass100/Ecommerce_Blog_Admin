import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice(
    {
        name: "cart",
        initialState: {
            products: [],
            quantity: 0,
            total: 0
        },
        reducers: {
            // addProduct: (state, action) => {
            //     state.quantity += 1
            //     state.products.push(action.payload)
            //     state.total += action.payload.price * action.payload.quantity
            // },
            addProduct: (state, action) => {
              const productToAdd = action.payload;
              const existingProduct = state.products.find(product => product._id === productToAdd._id);
            
              if (existingProduct) {
                existingProduct.quantity += productToAdd.quantity;
              } else {
                state.products.push(productToAdd);
              }
            
              state.quantity += productToAdd.quantity;
              state.total += productToAdd.price * productToAdd.quantity;
            },
            updateQuantity: (state, action) => {
              const { productId, quantity } = action.payload;
              const product = state.products.find((p) => p._id === productId);
              if (product) {
                const prevQuantity = product.quantity;
                state.quantity += quantity - prevQuantity;
                state.total += (quantity - prevQuantity) * product.price;
                product.quantity = quantity;
              }
            },
            clearCart: (state) => {
                state.products = [];
                state.quantity = 0;
                state.total = 0;
              },
              deleteProduct: (state, action) => {
                const productIdToDelete = action.payload;
              
                // Find the index of the product with the matching productId
                const productIndexToDelete = state.products.findIndex(product => product.productId === productIdToDelete);
              
                // If the product is found, remove it from the products array
                if (productIndexToDelete !== -1) {
                  const deletedProduct = state.products[productIndexToDelete];
              
                  // Update the quantity and total
                  state.quantity -= deletedProduct.quantity;
                  state.total -= deletedProduct.price * deletedProduct.quantity;
              
                  // Remove the product from the products array
                  state.products.splice(productIndexToDelete, 1);
                }
              
                // Ensure quantity and total are not negative
                state.quantity = Math.max(state.quantity, 0);
                state.total = Math.max(state.total, 0);
              },   
        }
    }
)

export const { addProduct, clearCart, deleteProduct, updateQuantity } = cartSlice.actions
export default cartSlice.reducer