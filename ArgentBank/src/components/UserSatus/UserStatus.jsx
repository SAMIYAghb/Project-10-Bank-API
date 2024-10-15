import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';

const UserStatus = () => {
  const { email, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Bienvenue, {email}!</p>
          <button onClick={() => dispatch(logout())}>Se déconnecter</button>
        </div>
      ) : (
        <p>Vous n&aposêtes pas connecté.</p>
      )}
    </div>
  );
};

export default UserStatus;