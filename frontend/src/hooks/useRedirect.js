import { useLocation, useNavigate } from 'react-router-dom';

export const useRedirect = (subRoute) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isAdminPage = pathname.includes('/admin');
  const redirect = () => {
    if (isAdminPage) {
      navigate(`/admin/${subRoute}`);
      return;
    }
    navigate(`/${subRoute}`);
  };
  return {
    redirect,
  };
};
