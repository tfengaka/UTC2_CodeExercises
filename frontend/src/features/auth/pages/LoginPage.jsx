import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'components/Button';
import { useAuth } from 'hooks/useAuth';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
const schemaValidation = Yup.object({
  email: Yup.string().email('Email không hợp lệ').required('Email không được để trống'),
  password: Yup.string().required('Mật khẩu không được để trống'),
});

function LoginPage() {
  const auth = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaValidation),
    mode: 'onSubmit',
  });
  return (
    <div className="login">
      <div className="container">
        <div className="login__title">
          <span>Đăng Nhập</span>
        </div>
        <div className="divider"></div>
        <div className="login__body">
          <form className="login__form" onSubmit={handleSubmit(auth.signIn)} autoComplete="off">
            <div className="login__form-control">
              <input type="text" placeholder="Email" {...register('email')} className="input_control" />
              {errors?.email ? (
                <div className="message-error">{errors.email?.message}</div>
              ) : (
                <div style={{ height: '16px' }}></div>
              )}
            </div>
            <div className="login__form-control">
              <input type="password" placeholder="Password" {...register('password')} className="input_control" />
              {errors?.password ? (
                <div className="message-error">{errors.password?.message}</div>
              ) : (
                <div style={{ height: '16px' }}></div>
              )}
            </div>
            <div className="login__form-submit">
              <Button size="full-lg" type="submit" isDisabled={auth.loading}>
                {auth.loading ? <div className="circleLoading"></div> : 'Đăng nhập'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
