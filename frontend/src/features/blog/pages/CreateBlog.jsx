import { useMutation } from '@apollo/client';
import Helmet from 'components/Helmet';
import { ADD_NEW_BLOG } from 'graphql/Mutation';
import { GET_ALL_BLOG } from 'graphql/Queries';
import { useRedirect } from 'hooks/useRedirect';
import React from 'react';
import BlogWritting from '../components/BlogWritting';
const CreateBlog = () => {
  const { redirect } = useRedirect('blog');
  const [addNewBlog] = useMutation(ADD_NEW_BLOG, {
    onCompleted: () => {
      alert(`Bài viết đã được tải lên!\nVui lòng đợi quản trị viên xét duyệt`);
      redirect();
    },
    onError: (err) => {
      alert('Có lỗi xảy ra trong quá trình tải lên, vui lòng thử lại sau');
      console.error(err.message);
    },
    refetchQueries: [GET_ALL_BLOG],
  });

  return (
    <Helmet title="Viết blog">
      <BlogWritting mutationHandle={addNewBlog} />
    </Helmet>
  );
};

export default CreateBlog;
