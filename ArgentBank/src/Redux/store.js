import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import profileReducer from './slices/profileSlice';
import signupReducer from './slices/signupSlice';
import editProfileReducer from './slices/editProfileSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        signup: signupReducer,
        editProfile: editProfileReducer,
      },
  });

export default store;