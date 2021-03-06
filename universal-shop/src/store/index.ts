import { configureStore } from "@reduxjs/toolkit";
import basket from "./basket";
import categories from './categories'
import categoryProducts from "./categoryProducts";
import currency from "./currentCurrency";

export default configureStore({
    reducer:{
        categories: categories,
        categoryProducts: categoryProducts,
        currency: currency,
        basket: basket
    }
})