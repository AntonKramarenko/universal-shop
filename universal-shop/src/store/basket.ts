import { createSlice } from '@reduxjs/toolkit';
import { IPrice } from '../types';

interface IAtribut {
	displayValue: string,
	id: string,
	value: string,
	__typename: string
}

interface IAttributes {
	id: string,
	items: IAtribut[]
	name: string,
	type: string
}

interface IBasketItem {
	id: string,
	name: string,
	brand: string,
	count: number,
	selectAttributes: any,
	attributes: IAttributes,
	inStock: boolean,
	prices: IPrice,
	gallery: string[]
}

const initialState: IBasketItem[] = [];

const basketSlice = createSlice({
	name: 'basketSlice',
	initialState,
	reducers: {
		addThingToBasket(state, action) {
			if (state.length !== 0) {
				const newState: IBasketItem[] = [];
				let isCopy = false;
				state.forEach((basketItem: IBasketItem) => {
					const copyStateItem = Object.assign({}, basketItem);
					if (copyStateItem.id === action.payload.id) {
						isCopy = true;
						copyStateItem.count = copyStateItem.count + action.payload.count;
						newState.push(copyStateItem);
					} else {
						newState.push(copyStateItem);
					}
				});

				if (!isCopy) {
					newState.push(action.payload);
				}

				return newState;
			} else {
				state.push(action.payload);
			}
		},
		changeCountItem(state, action) {
			const newState: IBasketItem[] = [];
			state.forEach((basketItem: IBasketItem) => {
				const copyStateItem = Object.assign({}, basketItem);
				if (copyStateItem.id === action.payload.id) {
					copyStateItem.count = copyStateItem.count + action.payload.count;
					if (copyStateItem.count !== 0) {
						newState.push(copyStateItem);
					}
				} else {
					newState.push(copyStateItem);
				}
			});
			return newState;
		},
		changeAttributesItem(state, action){
			const itemArr: IBasketItem[] = [];
			state.forEach((basketItem: IBasketItem) => {
				const copyStateItem = Object.assign({}, basketItem);
				if (copyStateItem.id === action.payload.id) {
					copyStateItem.id = action.payload.newId;
					copyStateItem.selectAttributes = action.payload.currentAttributes;
					itemArr.push(copyStateItem);
				}else {
					itemArr.push(copyStateItem);
				}
			});

			let newState:IBasketItem[] = []
			for (let i = 0; i < itemArr.length; i++) {
				if(itemArr[i+1]){
					if(itemArr[i].id === itemArr[i+1].id){
						itemArr[i+1].count +=itemArr[i].count
						newState.push(itemArr[i+1])
						i++
					}else{
						newState.push(itemArr[i])
					}
				}else {
					newState.push(itemArr[i])
				}
			}
			return newState;
			
		}
	}
});

export const { addThingToBasket, changeCountItem,changeAttributesItem } = basketSlice.actions;
export default basketSlice.reducer;
