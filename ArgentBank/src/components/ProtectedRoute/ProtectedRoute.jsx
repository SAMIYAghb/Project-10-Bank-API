import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace/>; // Redirige vers la page de connexion si non authentifié
  }

  return children;
};
ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired, // Vérifie que children est requis
  };
export default ProtectedRoute;