import { createSlice } from '@reduxjs/toolkit';
import { IPrice } from '../types';

interface IAtribut {
    displayValue:string,
    id:string,
    value:string,
    __typename:string
}

interface IAttributes {
    id:string,
    items:IAtribut[]
    name:string,
    type:string
}

interface IBasketItem {
            id: string,
			name:string,
			brand:string,
			count: number,
			selectAttributes: any,
			attributes: IAttributes,
			inStock:boolean,
			prices:IPrice,
			gallery:string[]
}

const initialState:IBasketItem[] =[];

const basketSlice = createSlice({
	name: 'basketSlice',
	initialState,
	reducers:{
		addThingToBasket(state,action ){
			if(state.length !==0){
				const newState:IBasketItem[] = [];
				let isCopy = false
				state.forEach((basretItem:IBasketItem) =>{
					const copyStateItem = Object.assign({},basretItem);
					if(copyStateItem.id === action.payload.id){
						isCopy= true
						copyStateItem.count = copyStateItem.count+action.payload.count;
						newState.push(copyStateItem);
					}else {
						newState.push(copyStateItem);
					}
				});

				if(!isCopy){
					newState.push(action.payload)
				}

				return newState;
			}else{
				state.push(action.payload); 
			}
		},
		changeCountItem(state,action){
			const newState:IBasketItem[] = [];
			state.forEach((basretItem:IBasketItem) =>{
				const copyStateItem = Object.assign({},basretItem);
				if(copyStateItem.id === action.payload.id){
					copyStateItem.count = copyStateItem.count+action.payload.count;
					if(copyStateItem.count !==0){
						newState.push(copyStateItem);
					}
				}else {
					newState.push(copyStateItem);
				}
			});
			return newState;
			
		}
	}
});


export const {addThingToBasket,changeCountItem} = basketSlice.actions;

export default basketSlice.reducer;

// addThingToBasket(state,action ){
// 	state.push(action.payload); 
// },