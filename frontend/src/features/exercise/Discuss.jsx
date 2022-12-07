import { useMutation, useQuery } from '@apollo/client';
import Button from 'components/Button';
import ServerError from 'components/ServerError';
import { ADD_DISCUSS, UPDATE_DISCUSS_REACT } from 'graphql/Mutation';
import { GET_ALL_DISCUSSES } from 'graphql/Queries';
import { useAuth } from 'hooks/useAuth';
import React from 'react';
import { format } from 'date-fns';

const Discuss = ({ exerciseId, setShowDiscuss }) => {
  const auth = useAuth();
  const { loading, error, data } = useQuery(GET_ALL_DISCUSSES, { variables: { exerciseId } });
  const [updateDiscussReact] = useMutation(UPDATE_DISCUSS_REACT);
  const [addDiscuss] = useMutation(ADD_DISCUSS);
  const [textArea, setTextArea] = React.useState('');
  const [isMounted, setIsMounted] = React.useState(true);

  if (loading) return <div className="circleLoading"></div>;
  if (error) return <ServerError />;

  const handleReact = (discussId, discussReactId = '') => {
    updateDiscussReact({
      variables: {
        discussId,
        id: discussReactId,
      },
      onError: (err) => {
        console.log(err.message);
      },
      refetchQueries: [GET_ALL_DISCUSSES, { variables: { exerciseId } }],
    });
  };

  const handleChangeComment = (e) => {
    setTextArea(e.target.value);
  };

  const handleCommentCancel = () => {
    setTextArea('');
  };

  const handleClose = () => {
    setIsMounted(false);

    return setTimeout(() => {
      setIsMounted(true);
      setShowDiscuss(false);
    }, 1000);
  };

  const handleCommentSubmit = () => {
    addDiscuss({
      variables: {
        exerciseId,
        content: textArea,
      },
      refetchQueries: [GET_ALL_DISCUSSES, { variables: { exerciseId } }],
      onError: (err) => {
        console.log(err.message);
      },
    });
  };

  return (
    <div
      className={`discuss_container animate__animated ${isMounted ? 'animate__fadeInLeft' : 'animate__fadeOutLeft'}`}
    >
      <div className="discuss_close">
        <h2>Hỏi Đáp</h2>
        <Button onClick={handleClose}>
          <i className="bx bx-x bx-md"></i>
        </Button>
      </div>
      <div className="discuss">
        {data.discusses.map((discuss, index) => (
          <div className="discuss_body" key={index}>
            <div className="discuss_body-avatar">
              {discuss.account.avatarUrl ? (
                <img id="avatar-contest_list" src={discuss.account.avatarUrl} alt="" />
              ) : (
                <i className="bx bx-user bx-lg"></i>
              )}
            </div>
            <div className="discuss_body-item">
              <div className="discuss_body-item_header">
                <h3>{discuss.account.fullName}</h3>
                <p className="date">{format(new Date(discuss.createdAt), 'dd-MM-yyyy - HH:mm:ss')}</p>
              </div>
              <p>{discuss.content}</p>
              <div className="discuss_body-item_footer">
                <div className="react">
                  <i
                    className="bx bxs-like bx-md"
                    onClick={() =>
                      handleReact(
                        discuss.id,
                        discuss.discuss_reacts.find((react) => react.createdBy === auth.user.id)?.id,
                      )
                    }
                    style={
                      discuss.discuss_reacts.find((reacted) => reacted.createdBy === auth.user?.id)
                        ? { color: '#4292FF' }
                        : null
                    }
                  ></i>
                  <p>{discuss.discuss_reacts_aggregate.aggregate.count || 0}</p>
                </div>
                <h4>Phản hồi</h4>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="discuss_footer">
        <div className="discuss_comment">
          <div className="discuss_comment-avatar">
            {auth.user.avatarUrl ? (
              <img id="avatar-contest_list" src={auth.user.avatarUrl} alt="" />
            ) : (
              <i className="bx bx-user bx-lg"></i>
            )}
          </div>
          <div className="discuss_comment-body">
            <textarea
              onChange={handleChangeComment}
              rows="3"
              cols="70"
              placeholder="Viết bình luận..."
              value={textArea}
            ></textarea>
          </div>
        </div>
        <div className="discuss_footer-button">
          <Button onClick={handleCommentCancel}>Huỷ</Button>
          <Button backgroundColor="green" onClick={handleCommentSubmit} isDisabled={textArea ? false : true}>
            Bình luận
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Discuss;
