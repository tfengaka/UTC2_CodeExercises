import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'components/Button';
import { useAuth } from 'hooks/useAuth';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

const registerValidation = Yup.object({
  displayName: Yup.string().required('Tên không được để trống'),
  email: Yup.string().email('Email không đúng định dạng').required('Email không được để trống'),
  password: Yup.string().required('Mật khẩu không được để trống'),
  repassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Mật khẩu không trùng khớp')
    .required('Nhập lại mật khẩu không được để trống'),
});

const Register = ({ onChangeRegister }) => {
  const auth = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerValidation),
    mode: 'onChange',
  });

  return (
    <>
      <div className="modal__body">
        <form onSubmit={handleSubmit(auth.signUp)} autoComplete="off">
          <div className="modal__body-control">
            <input
              type="text"
              id="displayName"
              placeholder="Họ và tên"
              {...register('displayName')}
              className={`input_control ${errors?.displayName ? 'error' : ''}`}
            />
            {errors?.displayName && <div className="message-error">{errors.displayName?.message}</div>}
          </div>
          <div className="modal__body-control">
            <input
              type="text"
              id="email"
              placeholder="Email"
              {...register('email')}
              className={`input_control ${errors?.email ? 'error' : ''}`}
            />
            {errors?.email && <div className="message-error">{errors.email?.message}</div>}
          </div>
          <div className="modal__body-control">
            <input
              type="password"
              id="password"
              placeholder="Mật khẩu"
              {...register('password')}
              className={`input_control ${errors?.password ? 'error' : ''}`}
            />
            {errors?.password && <div className="message-error">{errors.password?.message}</div>}
          </div>
          <div className="modal__body-control">
            <input
              type="password"
              id="repassword"
              placeholder="Nhập lại mật khẩu"
              {...register('repassword')}
              className={`input_control ${errors?.repassword ? 'error' : ''}`}
            />
            {errors?.repassword && <div className="message-error">{errors.repassword?.message}</div>}
          </div>
          <div className="modal__body-submit">
            <Button type="submit" size="full-lg" isDisabled={auth.loading}>
              {auth.loading ? <div className="circleLoading"></div> : 'Đăng kí'}
            </Button>
          </div>
        </form>
      </div>
      <div className="modal__footer">
        <div className="modal__footer-register">
          <div className="modal__footer-link" onClick={() => onChangeRegister(false)}>
            <span>Đã có tài khoản, Đăng nhập!</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
