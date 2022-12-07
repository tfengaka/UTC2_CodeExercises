import { useLazyQuery, useMutation } from '@apollo/client';
import { SIGN_IN, SIGN_UP } from 'graphql/Mutation';
import { GET_USER_INFO } from 'graphql/Queries';
import jwtDecode from 'jwt-decode';
import React from 'react';

const authContext = React.createContext();

export function useAuth() {
  return React.useContext(authContext);
}

export function AuthProvider({ children }) {
  const auth = useAuthProvider();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

function useAuthProvider() {
  const [user, setUser] = React.useState(null);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [isLogged, setIsLogged] = React.useState(false);

  const [signin] = useMutation(SIGN_IN);
  const [signup] = useMutation(SIGN_UP);

  const [getInfo] = useLazyQuery(GET_USER_INFO);

  const handleReLogin = React.useRef();

  handleReLogin.current = async (token) => {
    const id = jwtDecode(token).sub;
    await getInfo({
      variables: { ID: id },
      onCompleted: (data) => {
        if (data) {
          const userData = data.account_by_pk;
          setUser(userData);
          setIsAdmin(userData && (userData.role === 'admin' || userData.role === 'moderator'));
          setIsLogged(true);
          setLoading(false);
        } else {
          setUser(null);
          setIsLogged(false);
          setLoading(false);
        }
      },
      onError: (error) => {
        alert(`Có lỗi xảy ra, vui lòng thử lại sau!`);
        localStorage.removeItem('token');
      },
    });
  };

  React.useEffect(() => {
    setLoading(true);
    const access_token = localStorage.getItem('token');
    if (access_token) {
      handleReLogin.current(access_token);
    } else {
      setIsLogged(false);
      setLoading(false);
    }
  }, []);

  const signIn = ({ email, password }) => {
    setLoading(true);
    localStorage.removeItem('token');
    signin({
      variables: { email, password },
      onCompleted: (res) => {
        const { access_token } = res.login;
        localStorage.setItem('token', access_token);
        handleReLogin.current(access_token);
      },
      onError: (err) => {
        console.log(err);
        alert('Tài khoản hoặc mật khẩu không đúng!');
        setLoading(false);
      },
    });
  };
  const signOut = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsLogged(false);
    window.location.reload(true);
  };
  const signUp = ({ email, password, displayName }) => {
    setLoading(true);
    signup({
      variables: { email, password, display_name: displayName },
      onCompleted: (data) => {
        const { id, email, full_name, access_token } = data.createAccount;
        localStorage.setItem('token', access_token);
        const user = { id, email, fullName: full_name };
        setUser(user);
        setLoading(false);
        setIsLogged(true);
      },
      onError: (error) => {
        alert('Tài khoản đã tồn tại!');
        setIsLogged(false);
        setLoading(false);
      },
    });
  };

  return {
    user,
    isAdmin,
    loading,
    isLogged,
    signIn,
    signOut,
    signUp,
  };
}
