import { useMutation } from '@apollo/client';
import banner from 'assets/images/banner.png';
import Button from 'components/Button';
import Modal from 'features/auth/client/Modal';
import { UPDATE_AVATAR } from 'graphql/Mutation';
import { GET_USER_INFO } from 'graphql/Queries';
import { useAuth } from 'hooks/useAuth';
import { useFirebase } from 'hooks/useFirebase';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { generateSubStr } from 'utils';
import Dropdown from './Dropdown';
const routing = [
  { path: '/course', display: 'Học Tập', icon: 'bx bxs-book-reader' },
  { path: '/problem', display: 'Luyện Tập', icon: 'bx bxs-grid' },
  { path: '/contest', display: 'Thi Đấu', icon: 'bx bxs-trophy' },
  { path: '/challenge', display: 'Thử thách', icon: 'bx bxs-medal' },
  { path: '/rank', display: 'Xếp hạng', icon: 'bx bxs-bar-chart-alt-2' },
  { path: '/blog', display: 'Bài viết', icon: 'bx bxl-blogger' },
];

export default function Navigation() {
  const { pathname } = useLocation();
  const activeNav = routing.findIndex((e) => pathname.includes(e.path));

  const auth = useAuth();
  const { loading, uploadFile } = useFirebase('Avatar');
  const [showModal, setShowModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const avatarRef = React.useRef(null);

  const [updateAvatar] = useMutation(UPDATE_AVATAR);

  const changeHandler = async (event) => {
    const file = event.target.files[0];
    const fileName = `${generateSubStr(auth.user.id, 8)}-${auth.user.email}`;
    await uploadFile(file, fileName, file.type, (url) => {
      updateAvatar({
        variables: { userID: auth.user.id, avatarUrl: url },
        refetchQueries: [GET_USER_INFO],
        onCompleted: () => {
          alert('Cập nhật ảnh đại diện thành công');
        },
        onError: (err) => {
          alert('Có lỗi xảy ra');
          console.error(err.message);
        },
      });
    });
  };

  return (
    <>
      <div className="header">
        <div className="container">
          <div className="header__menu">
            <div className="header__menu__banner">
              <Link to="/">
                <img src={banner} alt="" />
              </Link>
            </div>
            {routing.map((route, index) => (
              <Link to={route.path} key={index} className={`header__menu__item ${index === activeNav ? 'active' : ''}`}>
                <i className={route.icon}></i>
                <span>{route.display}</span>
              </Link>
            ))}
          </div>

          <div className="header__account">
            {auth.user ? (
              <>
                <div
                  className={`header__account__info ${showDropdown && 'active'}`}
                  onClick={() => setShowDropdown(true)}
                >
                  <span>{auth.user.fullName}</span>
                  <div className="header__account__info_avatar">
                    {loading ? (
                      <div className="circleLoading color-main"></div>
                    ) : (
                      <img src={auth.user.avatarUrl || '/static/defaultAvatar.jpg'} alt="avatar" />
                    )}
                  </div>
                </div>
                {showDropdown && (
                  <Dropdown setActive={setShowDropdown}>
                    <div className="dropdown_item" onClick={() => avatarRef.current.click()}>
                      <input
                        type="file"
                        style={{ display: 'none' }}
                        ref={avatarRef}
                        onChange={(e) => changeHandler(e)}
                      />
                      <span>Đổi Avatar</span>
                    </div>
                    <div className="dropdown_item">
                      <Link to="/blog/create">Viết Blog</Link>
                    </div>
                    <div className="dropdown_item" onClick={() => auth.signOut()}>
                      <span>Đăng Xuất</span>
                    </div>
                  </Dropdown>
                )}
              </>
            ) : (
              <Button backgroundColor="main" onClick={() => setShowModal(true)} isDisabled={auth.loading}>
                {auth.loading ? <div className="circleLoading"></div> : 'Đăng nhập'}
              </Button>
            )}
          </div>
        </div>
      </div>
      {showModal && <Modal onShowModal={setShowModal} />}
    </>
  );
}
