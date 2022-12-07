import { useQuery } from '@apollo/client';
import PageLoading from 'components/PageLoading';
import ServerError from 'components/ServerError';
import { GET_USER_PROCESS_BY_ID } from 'graphql/Queries';
import React from 'react';

const UserProcess = ({ user }) => {
  const { loading, error, data } = useQuery(GET_USER_PROCESS_BY_ID, { variables: { userID: user.id } });
  if (loading) return <PageLoading />;
  if (error) {
    console.log(error);
    return <ServerError />;
  }
  const { contest_results_aggregate, exercise_results_aggregate } = data.account_by_pk;
  const { contests_aggregate, exercises_aggregate } = data;
  return (
    <section className="progress">
      <div className="progress__container">
        <h2 className="progress__welcome">
          Xin chào <span>{user.fullName}</span> Chào mừng bạn đến với CodingWar
        </h2>
        <div className="progress__wrap">
          <div className="progress__main">
            <div className="progress__user">
              <img
                src={user.avatarUrl || '/static/defaultAvatar.jpg'}
                alt="avatar"
                className="progress__user__avatar"
              />
              <div className="progress__user__info">
                <span>{user.fullName}</span>
              </div>
            </div>
          </div>
          <div className="progress__detail">
            <div className="progress__item">
              <h4>Số bài tập đã nộp</h4>
              <div className="progress__item__content">
                <span className="progress__item__result">
                  {exercise_results_aggregate.aggregate.count} / {exercises_aggregate.aggregate.count}
                </span>
                <span className="progress__item__progress-contest">Bài tập</span>
              </div>
              <div className="progress__item__progress">
                <div
                  className="progress__item__progress-bar"
                  style={{
                    width: `calc(${
                      (exercise_results_aggregate.aggregate.count / exercises_aggregate.aggregate.count) * 100
                    }%)`,
                  }}
                ></div>
              </div>
            </div>
            <div className="progress__item">
              <h4>Số cuộc thi đã tham gia</h4>
              <div className="progress__item__content">
                <span className="progress__item__result">
                  {contest_results_aggregate.aggregate.count} / {contests_aggregate.aggregate.count}
                </span>
                <span className="progress__item__progress-contest">Cuộc thi</span>
              </div>
              <div className="progress__item__progress">
                <div
                  className="progress__item__progress-bar"
                  style={{
                    width: `calc(${
                      (contest_results_aggregate.aggregate.count / contests_aggregate.aggregate.count) * 100
                    }%)`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProcess;
