import { createSlice } from '@reduxjs/toolkit';
import { ICategory } from '../types';


const initialState: ICategory[] =[]

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers:{
        addCategories(state:ICategory[], action:any): void{
            return state = action.payload;
        }
    }
});

export const { addCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;