import { useQuery } from '@apollo/client';
import PageLoading from 'components/PageLoading';
import ServerError from 'components/ServerError';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GET_ALL_CONCEPT_IN_COURSE } from 'graphql/Queries';

const CourseDetail = () => {
  const location = useLocation();
  const { courseData } = location.state;

  const { loading, error, data } = useQuery(GET_ALL_CONCEPT_IN_COURSE, {
    variables: {
      courseId: courseData.id,
    },
  });

  if (loading) return <PageLoading />;
  if (error) return <ServerError />;

  return (
    <div className="course-detail">
      <div className="course-detail_banner">
        <h1>{courseData.name}</h1>
        <div className="banner_header">
          <br />
          <img src={courseData.account.avatarUrl || '/static/defaultAvatar.jpg'} alt="" />
          <div className="banner_content">
            <h2>{courseData.account.fullName}</h2>
            <p>{courseData.des}</p>
          </div>
        </div>
      </div>
      <div className="course-concepts">
        {data?.concepts?.map((concept, index) => (
          <div className="course-concepts_card" key={index}>
            <div className="course-concepts_card-title">
              <h2>{concept.name}</h2>
            </div>
            <div className="course-concepts_card-exercise">
              {concept.exercises.map((exercise, index) => (
                <Link
                  className="exercise_number"
                  key={index}
                  to={`/course/${concept.id}/${exercise?.id?.substr(0, 8).toUpperCase()}`}
                  state={{ data: exercise }}
                >
                  {index + 1}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseDetail;
