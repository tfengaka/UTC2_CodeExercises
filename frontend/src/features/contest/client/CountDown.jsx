import React from 'react';
import Countdown, { zeroPad } from 'react-countdown';
import { useLocation } from 'react-router-dom';
import Competition from './Competition';
import { useQuery } from '@apollo/client';
import { GET_ALL_EXERCISE_CONTEST } from 'graphql/Queries';
import PageLoading from 'components/PageLoading';
import ServerError from 'components/ServerError';

const CompetitionCountDown = () => {
  const location = useLocation();
  let { contestId } = location.state;
  const { error, loading, data } = useQuery(GET_ALL_EXERCISE_CONTEST, {
    variables: {
      contestId: contestId,
    },
  });
  if (loading) return <PageLoading />;
  if (error) return <ServerError />;

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      return <h3>Hết giờ</h3>;
    }
    return (
      <h3>
        {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
      </h3>
    );
  };
  return (
    <Competition
      contestData={data?.contests_by_pk}
      component={Countdown}
      date={Date.now() + data?.contests_by_pk.time}
      renderer={renderer}
    />
  );
};

export default CompetitionCountDown;
