import Button from 'components/Button';
import { useAuth } from 'hooks/useAuth';
import React from 'react';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  const { user } = useAuth();
  return (
    <div className="course_item">
      <img src={course.image} alt="" />
      <div className="course_item-content">
        <h4>{course.name}</h4>
        <p>{course.des}</p>
      </div>
      <div className="course_item-footer">
        <Link to={`/course/${course.id}`} state={{ courseData: course }}>
          <Button isDisabled={user?.id ? false : true}>Học ngay</Button>
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
