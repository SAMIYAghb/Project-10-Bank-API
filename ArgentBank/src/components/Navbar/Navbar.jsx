import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/img/argentBankLogo.png'
import '../../css/main.css'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../Redux/slices/authSlice';
import { profileUser } from '../../Redux/slices/profileSlice';


const Navbar = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { firstName, lastName } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleLogout = () => {
    dispatch(logout()); // Appeler l'action de déconnexion
    dispatch(profileUser({ firstName, lastName }));
    navigate('/'); // Rediriger vers la page de connexion
  };

  return (
    <nav className="main-nav">
      <Link to='/'>
        <img src={logo} alt="argentBank logo" className="main-nav-logo-image" />
      </Link>
      <div>
        {
          isAuthenticated ? (
            <>
              <div className='nav-right-items'>
                <p className="main-nav-name">
                <i className="fa fa-user-circle" />{firstName}</p>
                <button onClick={handleLogout} className="main-nav-item">
                <i className="fa fa-sign-out" />
                  <span>
                    Sign out
                  </span>
                </button>
              </div>
            </>
          ) : (
            <Link to="/login" className="main-nav-item">
              <i className="fa fa-user-circle" />
              <span>Sign In</span>
            </Link>
          )
        }
      </div>
    </nav>
  )
}

export default Navbar
