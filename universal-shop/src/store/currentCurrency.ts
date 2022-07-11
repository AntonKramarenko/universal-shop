import { createSlice } from "@reduxjs/toolkit";
import { ICurrency } from "../types";


const initialState:ICurrency ={
    label: 'USD',
    symbol:'$'
}

const currentCurrencySlice = createSlice({
    name: 'CurrenciesSlice',
    initialState,
    reducers:{
        changeCurrentCurrency(state, action){
            state.label = action.payload.label
            state.symbol = action.payload.symbol
        }
    }
})

export const {changeCurrentCurrency} = currentCurrencySlice.actions;
export default currentCurrencySlice.reducer;