import { useDispatch, useSelector } from 'react-redux';
import '../../css/main.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../Redux/slices/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../../css/main.css'

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false); // Nouvelle state pour "Remember me"

  const dispatch = useDispatch();
  const { isAuthenticated,decodedToken,  loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(loginUser({ email, password, rememberMe })); // Appelle la thunk pour faire l'API call // Envoie l'action de login
  };

  const navigate = useNavigate();

  // Redirige vers la page du compte après la connexion
  useEffect(() => {
    if (isAuthenticated) {
      // console.log("Authenticated: Triggering success toast");
      toast.success("Vous êtes connectés!");

      if (decodedToken) {
        // console.log(decodedToken)
        navigate('/profile'); // Redirection vers la page de l'utilisateur
      }
      
    }
  }, [isAuthenticated, decodedToken, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(`Erreur: ${error}`);
    }
  }, [error]);

  // Stocke le token en fonction de l'état de "Remember me"
  // useEffect(() => {
  //   const token = sessionStorage.getItem('userToken');
  //   if (isAuthenticated && token) {
  //     if (rememberMe) {
  //       localStorage.setItem('userToken', token); // Stocker dans localStorage
  //     } else {
  //       sessionStorage.setItem('userToken', token); // Stocker dans sessionStorage
  //     }
  //   }
  // }, [isAuthenticated, rememberMe]);

  return (
    <main className="login">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon" />
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="email">email</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-remember">
            <input
              type="checkbox" id="remember-me"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)} // Met à jour la state "Remember me"
            />
            <label htmlFor="remember-me">Remember me
            </label>
          </div>
          <button type='submit' className="sign-in-button" disabled={loading}>{loading ? 'Connexion...' : 'Sign In'}</button>
        </form>
         {/* Lien pour la création de compte */}
         {/* <div className="sign-up-link">
          <p>Have&apos;nt an account?</p>
          <button onClick={() => navigate('/signup')} className="create-account-button">
          Sign up
          </button>
        </div> */}
        <ToastContainer />
      </section>
    </main>
  )
}

export default Login

// // {loading && <p>Connexion en cours...</p>}
// // {error && <p className={styles.error}>Erreur: {error}</p>}

