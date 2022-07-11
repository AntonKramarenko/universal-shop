import { createSlice } from "@reduxjs/toolkit";


const initialState ={}

const categoryProducts = createSlice({
    name: 'CategoryProducts',
    initialState,
    reducers:{
        addCategoryProducts(state, action){
            state[action.payload.category.name] = action.payload.category.products
        }
    }
})


export const {addCategoryProducts} = categoryProducts.actions;
export default categoryProducts.reducer