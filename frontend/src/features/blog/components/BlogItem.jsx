import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
const BlogItem = ({ id, title, content, thumbnail, account, createdAt }) => {
  return (
    <Link to={`/blog/${id.substr(0, 8)}`} state={{ id }} className="blog_item">
      <div className="blog_item_body">
        <div className="blog_item_body_info">
          <h3>{title}</h3>
          <p>{`${content.split('\n')[0]}...`}</p>
          <div className="blog_item_body_info_author">
            <span>{`Tác giả: ${String(account.fullName)}`}</span>
            <span>{`Đăng tải lúc: ${moment(createdAt).format('DD/MM/YYYY')}`}</span>
          </div>
        </div>
        {thumbnail && (
          <div className="blog_item_body_thumb">
            <img src={thumbnail} alt="thumbnail" />
          </div>
        )}
      </div>
    </Link>
  );
};

export default BlogItem;
