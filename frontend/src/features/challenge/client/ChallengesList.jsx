import { useMutation, useQuery } from '@apollo/client';
import Button from 'components/Button';
import Helmet from 'components/Helmet';
import PageLoading from 'components/PageLoading';
import ServerError from 'components/ServerError';
import { UPDATE_CHALLENGE } from 'graphql/Mutation';
import { GET_ALL_CHALLENGE } from 'graphql/Queries';
import { useAuth } from 'hooks/useAuth';
import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';
import background from '../../../assets/images/background.png';

const ChallengesList = ({ isChallengesList }) => {
  const { data, loading, error } = useQuery(GET_ALL_CHALLENGE);
  const { user } = useAuth();
  const [removeChallenge] = useMutation(UPDATE_CHALLENGE);
  if (loading) return <PageLoading />;
  if (error) {
    console.error(error.message);
    return <ServerError />;
  }

  const handleListRemove = (challengeId, name) => {
    removeChallenge({
      variables: { challengeId, name: `[deleted]${name}`, status: 'deleted' },
      // variables: { exerciseId: id, des, name: 'deleted'+ name, topic, level, updatedAt, metadata, status: 'deleted' },
      onCompleted: () => {
        alert('Xóa thành công');
      },
      onError: (error) => {
        alert(error.message);
      },
    });
  };
  return (
    <Helmet title="Thử thách">
      <div className="challenge animate__animated animate__fadeInDown">
        <center>
          <h1>Danh sách các thử thách</h1>
        </center>
        <div className="challenge_container">
          {data.challenges.map((challenge, index) => (
            <div className="challenge_card" key={index}>
              <img src={background} alt="" />
              <div className="challenge_card-content">
                <div className="challenge_card-content_logo">
                  <img src={challenge.image} alt="" />
                </div>
                <div className="challenge_card-content_detail">
                  <div className="duration">
                    <i className="bx bxs-calendar bx-md"></i>
                    <b>
                      <span>{`${moment(challenge.startDate).format('DD/MM/YYYY')} - ${moment(challenge.endDate).format(
                        'DD/MM/YYYY',
                      )}`}</span>
                    </b>
                  </div>
                  <h1>{`#${challenge.priority} ${challenge.name}`}</h1>
                  <p>{challenge.des}</p>
                </div>
                <div className="challenge_card-content_user">
                  <>
                    <p>Nguời tạo</p>
                    <img src={challenge.account.avatarUrl} alt="" />
                    <p>{challenge.account.fullName}</p>
                  </>
                  <Link
                    to={`/challenge/${challenge.exercises[0].id.substr(0, 8).toUpperCase()}`}
                    state={{ data: challenge.exercises[0] }}
                  >
                    {isChallengesList ? (
                      <>
                        <Button backgroundColor="green" isDisabled={user?.id ? false : true}>
                          Sửa
                        </Button>
                        <Button
                          backgroundColor="green"
                          isDisabled={user?.id ? false : true}
                          onClick={() => handleListRemove(challenge.id, challenge.name)}
                        >
                          Xóa
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button backgroundColor="green" isDisabled={user?.id ? false : true}>
                          Chiến thôi
                        </Button>
                      </>
                    )}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Helmet>
  );
};

export default ChallengesList;
