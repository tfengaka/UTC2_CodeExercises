import { useMutation, useQuery } from '@apollo/client';
import Helmet from 'components/Helmet';
import PageLoading from 'components/PageLoading';
import ServerError from 'components/ServerError';
import { EDIT_BLOG_BY_ID } from 'graphql/Mutation';
import { GET_ALL_BLOG, GET_BLOG_BY_ID } from 'graphql/Queries';
import { useRedirect } from 'hooks/useRedirect';
import React from 'react';
import { useLocation } from 'react-router-dom';
import BlogWritting from '../components/BlogWritting';

const EditBlog = () => {
  const { redirect } = useRedirect('blog');
  const { state } = useLocation();
  const [editBlog] = useMutation(EDIT_BLOG_BY_ID, {
    refetchQueries: [GET_ALL_BLOG],
    onCompleted: () => {
      alert(`Bài viết đã được chỉnh sửa!\nVui lòng đợi quản trị viên xét duyệt lại`);
      redirect();
    },
    onError: (err) => {
      alert('Có lỗi xảy ra trong quá trình xử lý, vui lòng thử lại sau');
    },
  });
  const { loading, error, data } = useQuery(GET_BLOG_BY_ID, { variables: { blogID: state.id } });
  if (loading) return <PageLoading />;
  if (error) return <ServerError />;

  const currentBlog = {
    blogid: data.blogs_by_pk.id,
    blogtitle: data.blogs_by_pk.title,
    blogcontent: data.blogs_by_pk.content,
  };
  return (
    <Helmet title="Chỉnh sửa bài viết">
      <BlogWritting {...currentBlog} mutationHandle={editBlog} />
    </Helmet>
  );
};

export default EditBlog;
