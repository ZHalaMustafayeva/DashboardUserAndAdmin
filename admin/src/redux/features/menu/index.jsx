import { createSlice } from "@reduxjs/toolkit";

export const menuSlice = createSlice({
    name: "menu",
    initialState: {
        value: {
            isPayrollPage: false,
            // select: '',
            // name: "",
            // open: [],
            // list: []
        }
    },
    reducers: {
        setIsPayrollPage: (state, action) => {
            state.value.isPayrollPage = action.payload;
        },
        // selectMenuList: (state, action) => {
        //     state.value.list = action.payload;
        // },
        // selectSubIndex: (state, action) => {
        //     state.value.select = action.payload;
        // },
        // selectSubName: (state, action) => {
        //     state.value.name = action.payload;
        // },
        // selectSubOpen: (state, action) => {
        //     state.value.open = [action.payload];
        // }
    }
});

export const {
    setIsPayrollPage,
    // selectMenuList, selectSubIndex, selectSubName, selectSubOpen
} = menuSlice.actions;
export const selectMenu = state => state.menu.value;
export default menuSlice.reducer;