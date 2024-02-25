import { useSelector } from 'react-redux';
import { RootState } from '../store/rootReducer';

const useAuth = () => {
  const isAuthenticated: boolean = useSelector((state: RootState) => state.auth.isAuthenticated);
  return isAuthenticated;
};

export default useAuth;
