import { useAuth } from 'hooks/useAuth';
import React from 'react';
import Login from './Components/Login';
import Register from './Components/Register';

const Modal = ({ onShowModal }) => {
  const [isRegister, setIsRegister] = React.useState(false);
  const auth = useAuth();
  React.useEffect(() => {
    if (auth.user) {
      onShowModal(false);
    }
  }, [auth.user, onShowModal]);

  return (
    <div className="modal">
      <div className="modal__container animate__animated animate__fadeInDown" style={{ animationDuration: '0.5s' }}>
        <div className="modal__header">
          <span className="modal__header__title">{isRegister ? 'Đăng Ký' : 'Đăng Nhập'}</span>
          <button className="modal__close" onClick={() => onShowModal(false)}>
            <i className="bx bx-x"></i>
          </button>
        </div>
        <div className="divider"></div>
        {isRegister ? (
          <Register onChangeRegister={setIsRegister} onChangeModal={onShowModal} />
        ) : (
          <Login onChangeRegister={setIsRegister} onChangeModal={onShowModal} />
        )}
      </div>
    </div>
  );
};

export default Modal;
