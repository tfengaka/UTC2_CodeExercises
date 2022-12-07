import { useMutation, useQuery } from '@apollo/client';
import Button from 'components/Button';
import Helmet from 'components/Helmet';
import PageLoading from 'components/PageLoading';
import ServerError from 'components/ServerError';
import { APPROVED_NEW_BLOG, REMOVE_BLOG_BY_ID } from 'graphql/Mutation';
import { GET_ALL_BLOG } from 'graphql/Queries';
import { useAuth } from 'hooks/useAuth';
import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';
import { generateSubStr } from 'utils';
const BlogAdmin = () => {
  const { loading, error, data } = useQuery(GET_ALL_BLOG);

  if (loading) return <PageLoading />;
  if (error) return <ServerError />;

  return (
    <Helmet title="Danh sách bài viết">
      <div className="table">
        <div className="container">
          <div className="table_head">
            <div className="table_head_title">
              <span>Danh sách bài viết</span>
            </div>
          </div>
          <div className="table_body">
            <div className="table_body_heading">
              <table>
                <colgroup>
                  <col width="30" />
                  <col width="100" />
                  <col />
                  <col width="200" />
                  <col width="170" />
                  <col width="100" />
                  <col width="270" />
                </colgroup>
                <thead>
                  <tr>
                    <th className="table_body_heading_item"></th>
                    <th className="table_body_heading_item">
                      <div className="table_cell">
                        <span>ID</span>
                      </div>
                    </th>
                    <th className="table_body_heading_item">
                      <div className="table_cell">
                        <span>Tiêu đề</span>
                      </div>
                    </th>
                    <th className="table_body_heading_item">
                      <div className="table_cell">
                        <span>Tác giả</span>
                      </div>
                    </th>
                    <th className="table_body_heading_item">
                      <div className="table_cell">
                        <span>Cập nhật lúc</span>
                      </div>
                    </th>
                    <th className="table_body_heading_item">
                      <div className="table_cell">
                        <span>Trạng thái</span>
                      </div>
                    </th>
                    <th className="table_body_heading_item">
                      <div className="table_cell">
                        <span>Thao Tác</span>
                      </div>
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
            <div className="table_body_content">
              <table>
                <colgroup>
                  <col width="30" />
                  <col width="100" />
                  <col />
                  <col width="200" />
                  <col width="170" />
                  <col width="100" />
                  <col width="270" />
                </colgroup>
                <tbody>{data && data.blogs.map((blog, index) => <Row key={index} {...blog} />)}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Helmet>
  );
};

export default BlogAdmin;

const Row = ({ id, title, account, isApproved, updatedBy, createdAt, updatedAt }) => {
  const [removeBlog] = useMutation(REMOVE_BLOG_BY_ID, {
    variables: { blogID: id },
    onCompleted: () => {
      alert('Gỡ bài viết thành công');
    },
    onError: (error) => {
      alert(error.message);
    },
    refetchQueries: [GET_ALL_BLOG],
  });
  const [confirmBlog] = useMutation(APPROVED_NEW_BLOG, {
    variables: { blogID: id },
    onCompleted: () => {
      alert('Bài viết đã được duyệt');
    },
    onError: (error) => {
      alert(error.message);
    },
    refetchQueries: [GET_ALL_BLOG],
  });
  const handleRemoveBlog = () => {
    if (window.confirm('Bạn có chắc chắn muốn gỡ bài viết này?')) {
      removeBlog();
    }
  };
  const handleConfirmBlog = () => {
    if (window.confirm('Bạn có chắc chắn muốn duyệt bài viết này?')) {
      confirmBlog();
    }
  };
  return (
    <tr className="table_row">
      <td className="table_body_content_item"></td>
      <td className="table_body_content_item">
        <div className="table_cell">
          <Link to={`/admin/blog/${generateSubStr(id, 8)}`} state={{ id }}>
            <span>{`${generateSubStr(id, 9)}...`}</span>
          </Link>
        </div>
      </td>
      <td className="table_body_content_item">
        <div className="table_cell">
          <Link to={`/admin/blog/${generateSubStr(id, 8)}`} state={{ id }}>
            {title.length > 170 ? <span>{`${generateSubStr(title, 170)}...`}</span> : <span>{title}</span>}
          </Link>
        </div>
      </td>
      <td className="table_body_content_item">
        <div className="table_cell">
          <span>{account.fullName}</span>
        </div>
      </td>
      <td className="table_body_content_item">
        <div className="table_cell">
          {updatedAt ? (
            <span>{moment(updatedAt).format('DD/MM/YYYY HH:mm')}</span>
          ) : (
            <span>{moment(createdAt).format('DD/MM/YYYY HH:mm')}</span>
          )}
        </div>
      </td>
      <td className="table_body_content_item">
        <div className="table_cell">
          <div className={`tag bg-${isApproved ? 'green' : 'orange'}`}>
            <span>{`${isApproved ? 'Đã duyệt' : 'Chờ duyệt'}`}</span>
          </div>
        </div>
      </td>
      <td className="table_body_content_item">
        <div className="table_cell actions">
          {!isApproved && (
            <Button backgroundColor="green" onClick={() => handleConfirmBlog()}>
              <i className="bx bx-check-circle"></i>
              <span>Duyệt</span>
            </Button>
          )}
          <Link to={`/admin/blog/${generateSubStr(id, 8)}/edit`} state={{ id }}>
            <Button backgroundColor="blue">
              <i className="bx bxs-edit"></i>
              <span>Sửa</span>
            </Button>
          </Link>
          <Button backgroundColor="red" onClick={() => handleRemoveBlog()}>
            <i className="bx bxs-trash"></i>
            <span>Gỡ</span>
          </Button>
        </div>
      </td>
    </tr>
  );
};
