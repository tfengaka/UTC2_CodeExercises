import { useQuery } from '@apollo/client';
import Helmet from 'components/Helmet';
import PageLoading from 'components/PageLoading';
import ServerError from 'components/ServerError';
import BlogItem from 'features/blog/components/BlogItem';
import { GET_ALL_BLOG } from 'graphql/Queries';
import React from 'react';

const BlogClient = () => {
  const { loading, error, data } = useQuery(GET_ALL_BLOG);
  if (loading) return <PageLoading />;
  if (error) {
    console.log(error.message)
    return <ServerError/>
  }

  const acceptedBlogs = data.blogs.filter((blog) => blog.isApproved);
  return (
    <Helmet title="Danh sách bài viết">
      <div className="blog">
        <div className="container animate__animated animate__fadeInDown">
          <div className="blog_header">
            <span>Bài viết nổi bật</span>
          </div>
          <div className="divider"></div>
          <section className="blog_body">
            {acceptedBlogs.map((item, index) => (
              <BlogItem key={index} {...item} />
            ))}
          </section>
        </div>
      </div>
    </Helmet>
  );
};

export default BlogClient;
