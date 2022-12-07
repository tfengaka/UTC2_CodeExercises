import PageLoading from 'components/PageLoading';
import LoginPage from 'features/auth/pages/LoginPage';
import { useAuth } from 'hooks/useAuth';
import * as React from 'react';
import { Outlet } from 'react-router-dom';

export function PrivateRoute() {
  const { loading, isAdmin, isLogged } = useAuth();
  if (loading) return <PageLoading />;
  if (!isLogged) {
    return <LoginPage />;
  } else if (isLogged && !isAdmin) {
    alert('Bạn không có quyền truy cập vào trang này\nVui lòng liên hệ với quản trị viên');
    return <LoginPage />;
  } else {
    return <Outlet />;
  }
}
