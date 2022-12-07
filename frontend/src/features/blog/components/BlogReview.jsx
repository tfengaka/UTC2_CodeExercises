import MDView from 'components/MarkDownEdior/MDView';
import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
const BlogReview = ({ title, content, createdAt, account, adminPage }) => {
  return (
    <div className="blog review">
      <Link to={adminPage ? '/admin/blog' : '/blog'} className="rollback">
        <i className="bx bx-arrow-back"></i>
        <span>Quay lại</span>
      </Link>
      {/* Blog content */}
      <div className="blog_detail">
        <div className="blog_detail_title">
          <strong>{title}</strong>
        </div>
        <div className="blog_detail_header">
          <div className="blog_detail_header_user">
            <div className="blog_detail_header_user_avatar">
              <img src={account.avatarURL || '/static/defaultAvatar.jpg'} alt="" />
            </div>
            <div className="blog_detail_header_user_info">
              <span>{`Tác giả: ${String(account.fullName)}`}</span>
              <div className="date">
                <span>{`Đăng tải ngày: ${moment(createdAt).format('DD/MM/YYYY')}`}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="blog_detail_content">
          <MDView source={content} />
        </div>
      </div>
    </div>
  );
};

export default BlogReview;
