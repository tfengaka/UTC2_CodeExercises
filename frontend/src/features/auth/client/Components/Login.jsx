import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'components/Button';
import { useAuth } from 'hooks/useAuth';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

const schemaValidation = Yup.object({
  email: Yup.string().email('Email không hợp lệ').required('Email không được để trống'),
  password: Yup.string().required('Mật khẩu không được để trống'),
});

const Login = ({ onChangeRegister, onChangeModal }) => {
  const auth = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaValidation),
    mode: 'onChange',
  });
  return (
    <>
      <div className="modal__body">
        <form onSubmit={handleSubmit(auth.signIn)} autoComplete="off">
          <div className="modal__body-control">
            <input
              {...register('email')}
              type="text"
              id="email"
              placeholder="Email"
              className={`input_control ${errors?.email ? 'error' : ''}`}
            />
            {errors?.email && <div className="message-error">{errors.email?.message}</div>}
          </div>
          <div className="modal__body-control">
            <input
              {...register('password')}
              type="password"
              id="password"
              placeholder="Mật khẩu"
              className={`input_control ${errors?.password ? 'error' : ''}`}
            />
            {errors?.password && <div className="message-error">{errors.password?.message}</div>}
          </div>
          <div className="modal__body-submit">
            <Button type="submit" size="full-lg" isDisabled={auth.loading}>
              {auth.loading ? <div className="circleLoading"></div> : 'Đăng nhập'}
            </Button>
          </div>
        </form>
      </div>
      <div className="modal__footer">
        <div className="modal__footer-login">
          <div className="modal__footer-link" onClick={() => onChangeRegister(true)}>
            <span>Chưa có tài khoản, Đăng ký!</span>
          </div>
          <div className="modal__footer-link">
            <span>Quên mật khẩu?</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
