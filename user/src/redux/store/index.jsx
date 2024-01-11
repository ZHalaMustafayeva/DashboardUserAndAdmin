import { configureStore } from '@reduxjs/toolkit';

import menuSlice from '../features/menu';
// import authenticationSlice from '../features/authentication';
// import contractSlice from '../features/contract';

export const store = configureStore({
    reducer: {
        menu: menuSlice,
        // authentication: authenticationSlice,
        // contract: contractSlice
    }
});