import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const URL_API = "http://localhost:3001/api/v1";


// Thunk pour l'appel API du login
export const signupUser = createAsyncThunk(
    'signup/signupUser',
    async ({ email, password, firstName, lastName }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${URL_API}/user/signup`, { email, password, firstName, lastName }, {
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            console.log(response.data)
            // console.log(response.data)
            return response?.data; // Retourne les données de l'API si succès
        } catch (error) {
            return rejectWithValue(error?.response?.data); // Gestion des erreurs
        }
    }
);

const initialState = {
    firstName:'',
    lastName:'',
    email: '',
    password: '',
    loading: false,
    error: null,
};

const signupSlice = createSlice({
    name: 'signup',
    initialState,
    extraReducers: (builder) => {
      builder
        .addCase(signupUser.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(signupUser.fulfilled, (state, action) => {
          state.email = action.payload.body.email;
          state.password = action.payload.body.password;
          state.firstName = action.payload.body.firstName;
          state.lastName = action.payload.body.lastName;
          state.loading = false;
          state.error = null;
        })
        .addCase(signupUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });
  
  
  export default signupSlice.reducer;