import { useQuery } from '@apollo/client';
import Helmet from 'components/Helmet';
import PageLoading from 'components/PageLoading';
import ServerError from 'components/ServerError';
import { GET_ALL_COURSE } from 'graphql/Queries';
import { useAuth } from 'hooks/useAuth';
import React from 'react';
import CourseCard from './CourseCard';
import UserProcess from './UserProcess';

const CoursesList = () => {
  const auth = useAuth();
  const { loading, error, data } = useQuery(GET_ALL_COURSE);

  if (loading) return <PageLoading />;
  if (error) return <ServerError />;

  return (
    <Helmet title={'Khóa học'}>
      {auth.user && <UserProcess user={auth.user} />}
      <div className="course animate__animated animate__fadeInDown">
        <h2>Danh Sách Khoá Học</h2>
        <div className="course_body">
          {data.courses.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </div>
        <div className="course_footer"></div>
      </div>
    </Helmet>
  );
};

export default CoursesList;
