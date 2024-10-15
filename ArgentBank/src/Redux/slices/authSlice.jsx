import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const URL_API = "http://localhost:3001/api/v1";




// Thunk pour l'appel API du login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password, rememberMe }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${URL_API}/user/login`, { email, password });
      // console.log(response.data)
      // console.log(response.data.message)
      // console.log(response.data.body.token)
      // Store the token in local storage
      // localStorage.setItem('userToken', response?.data?.body?.token);
      const token = response?.data?.body?.token;

      // Stocker le token dans le  sessionStorage
      sessionStorage.setItem('userToken', token);
      // localStorage.setItem('userToken', token);
      // Store the token in the correct storage based on "Remember me"
      if (rememberMe) {
        localStorage.setItem('userToken', token); // Save token in localStorage if "Remember me" is checked
      } else {
        sessionStorage.setItem('userToken', token); // Save token in sessionStorage if not
      }
      // sessionStorage.setItem('userToken', response?.data?.body?.token); 
      // Décoder le token
      const decodedToken = jwtDecode(token);

      // Retourner à la fois les données de l'API et le token décodé
      return { ...response?.data, decodedToken };
      // return response?.data; // Retourne les données de l'API si succès
    } catch (error) {
      return rejectWithValue(error?.response?.data); // Gestion des erreurs
    }
  }
);

const initialState = {
  email: '',
  password: '',
  isAuthenticated: !!sessionStorage.getItem('userToken')|| !!localStorage.getItem('userToken'), // Check both storages
  decodedToken: null, // Ajouter un champ pour stocker le token décodé
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.email = '';
      state.password = '';
      state.isAuthenticated = false;
      state.error = null;
      state.decodedToken = null; // Réinitialiser le token décodé
      // Supprimer le token JWT du localStorage
      sessionStorage.removeItem('userToken');
      localStorage.removeItem('userToken');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.email = action.payload.email;
        state.isAuthenticated = true;
        state.decodedToken = action.payload.decodedToken; // Stocker le token décodé dans le state
        state.loading = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;