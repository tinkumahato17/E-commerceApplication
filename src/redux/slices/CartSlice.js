const { createSlice } = require("@reduxjs/toolkit");

const CartSlice = createSlice({
    name: 'cart',
    initialState: {
        data: [],
    },
    reducers: {
        addItemToCart(state, action) {
            let tempData = state.data;
            let isItemExist = false;
            // Only 1 item add to cart
            tempData.map(item => {
                if (item.id == action.payload.id) {
                    isItemExist = true;
                    item.qty = item.qty + 1;
                }
            });
            if (!isItemExist) {
                tempData.push(action.payload);
            }

            state.data = tempData;
        },
        reduceItemFromCart(state, action) {
            let tempData = state.data;
            // Only 1 item reduce to cart
            tempData.map(item => {
                if (item.id == action.payload.id) {
                    item.qty = item.qty - 1;
                }
            });
            state.data = tempData;
        },
        // remove the item
        removeItemFromCart(state, action) {
            let tempData = state.data;
            tempData.splice(action.payload, 1);
            state.data = tempData;

        },
        emptyCart (state,action){
            state.data = [];
        },
    },
});

export const { addItemToCart ,reduceItemFromCart,removeItemFromCart,emptyCart} = CartSlice.actions;
export default CartSlice.reducer;
