import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  loading: user.loadingDetail
});

const useAuth = props => {
  const { currentUser ,loading } = useSelector(mapState);
  const history = useHistory();

  useEffect(() => {
    if (!currentUser) {
      history.push('/login')
    }

  }, [currentUser]);

  return currentUser;


};


export default useAuth;