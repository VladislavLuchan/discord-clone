import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../features/userSlice'
import appSlice from '../features/appSlice'

export default configureStore({
  reducer: {
    user: userSlice,
    app: appSlice
  },
});
