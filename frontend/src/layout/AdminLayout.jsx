import { useMutation } from '@apollo/client';
import Dropdown from 'components/Dropdown';
import SideBar from 'components/SideBar';
import { UPDATE_AVATAR } from 'graphql/Mutation';
import { GET_USER_INFO } from 'graphql/Queries';
import { useAuth } from 'hooks/useAuth';
import { useFirebase } from 'hooks/useFirebase';
import * as React from 'react';
import { AdminRoutes } from 'routes';
import { generateSubStr } from 'utils';

export function AdminLayout() {
  const auth = useAuth();
  const { loading, uploadFile } = useFirebase('Avatar');

  const [updateAvatar] = useMutation(UPDATE_AVATAR);
  const [showDropdown, setShowDropdown] = React.useState(false);
  const avatarRef = React.useRef(null);

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
    <div className="admin">
      <div className="admin_header">
        <div className="header__account">
          <div
            className={`header__account__info ${showDropdown ? 'active' : ''}`}
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
                <input type="file" style={{ display: 'none' }} ref={avatarRef} onChange={(e) => changeHandler(e)} />
                <span>Đổi Avatar</span>
              </div>
              <div className="dropdown_item" onClick={() => auth.signOut()}>
                <span>Đăng Xuất</span>
              </div>
            </Dropdown>
          )}
        </div>
      </div>
      <SideBar />
      <div className="admin_content">
        <AdminRoutes />
      </div>
    </div>
  );
}
