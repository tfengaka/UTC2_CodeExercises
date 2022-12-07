import { useQuery } from '@apollo/client';
import Helmet from 'components/Helmet';
import PageLoading from 'components/PageLoading';
import { GET_BLOG_BY_ID } from 'graphql/Queries';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { generateSubStr } from 'utils';
import BlogReview from '../components/BlogReview';

const BlogDetail = () => {
  const { pathname, state } = useLocation();
  const isAdminPage = pathname.includes('/admin/blog');
  const { loading, error, data } = useQuery(GET_BLOG_BY_ID, { variables: { blogID: state.id } });
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [state]);

  if (loading) return <PageLoading />;
  if (error) {
    alert(error.message);
    return;
  }
  const currentBlog = {
    title: data.blogs_by_pk.title,
    content: data.blogs_by_pk.content,
    account: data.blogs_by_pk.account,
  };
  const otherBlogs = data.blogs_by_pk.account.blogs;

  return (
    <Helmet title={currentBlog.title}>
      <div className="blog">
        <div className="container">
          <BlogReview adminPage={isAdminPage} {...currentBlog} />
          <div className="blog_others">
            <h3>Bài viết liên quan</h3>
            <div className="divider"></div>
            <ul className="blog_others_list">
              {otherBlogs.map((item, index) => (
                <li key={index}>
                  <Link
                    to={
                      isAdminPage ? `/admin/blog/${generateSubStr(item.id, 8)}` : `/blog/${generateSubStr(item.id, 8)}`
                    }
                    state={{ id: item.id }}
                    className="blog_others_list_link"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Helmet>
  );
};

export default BlogDetail;
