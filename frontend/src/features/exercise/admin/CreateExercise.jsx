import { useMutation } from '@apollo/client';
import Button from 'components/Button';
import Helmet from 'components/Helmet';
import MDEditor from 'components/MarkDownEdior/MDEditor';
import PageLoading from 'components/PageLoading';
import { INSERT_EXERCISE_CHALLENGE, INSERT_PROBLEM, UPDATE_CHALLENGE_IMAGE, UPDATE_PROBLEM } from 'graphql/Mutation';
import { GET_ALL_EXERCISE, GET_ALL_EXERCISE_CONTEST } from 'graphql/Queries';
import { useFirebase } from 'hooks/useFirebase';
import { useRedirect } from 'hooks/useRedirect';
import moment from 'moment';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { checkAllObjectIsNullOfArray } from 'utils';

const initialCase = {
  input: '',
  output: '',
  point: '',
  time: '',
};

const CreateExercise = ({
  isChallenge,
  file,
  inputChallenge,
  startDate,
  endDate,
  haveChallengeData,
  handleChallengeUpdate,
  challengeId,
}) => {
  const { state } = useLocation();
  const exerciseData = state?.exerciseData;
  const contestId = state?.contestId || null;
  const refetchQueries = [contestId ? GET_ALL_EXERCISE_CONTEST : GET_ALL_EXERCISE];

  const navigate = useNavigate();
  const { loading, uploadFile } = useFirebase('Challenge');
  const { redirect } = useRedirect('challenge');

  const [saveChallenge] = useMutation(INSERT_EXERCISE_CHALLENGE);
  const [updateChallengeImage] = useMutation(UPDATE_CHALLENGE_IMAGE);

  const haveExerciseData = exerciseData ? true : false;
  const [input, setInput] = useState(
    haveExerciseData
      ? {
          name: exerciseData.name,
          level: exerciseData.level,
          topic: exerciseData.topic.join(', '),
          metadata: exerciseData.metadata,
        }
      : {},
  );
  const [value, setValue] = useState(haveExerciseData ? exerciseData.des : '');
  const [caseData, setCaseData] = useState(haveExerciseData ? exerciseData.metadata : [initialCase]);

  const [saveExercise] = useMutation(INSERT_PROBLEM);
  const [updateExercise] = useMutation(UPDATE_PROBLEM);

  const handleQuestionAdd = () => {
    setCaseData([...caseData, initialCase]);
  };

  const handleQuestionRemove = (indexRemove) => {
    setCaseData(caseData.filter((_, index) => index !== indexRemove));
  };

  // handle case
  const handleChange = (e, index) => {
    const obj = {
      ...caseData[index],
      [e.target.name]: e.target.name === 'point' ? parseInt(e.target.value, 10) : e.target.value,
    };
    setCaseData([...caseData.slice(0, index), obj, ...caseData.slice(index + 1)]);
  };

  // handle input exercise
  const handleChangeInput = (e) => {
    setInput({
      ...input,
      ...(e.target.name === 'level'
        ? { [e.target.name]: parseInt(e.target.value, 10) }
        : { [e.target.name]: e.target.value }),
    });
  };

  const handleSaveExercise = async () => {
    if (!input?.topic) {
      return alert('Vui lòng nhập từ khoá');
    }

    const isNull = checkAllObjectIsNullOfArray(caseData);
    if (isNull) {
      return alert('Vui lòng nhập đầy đủ các case');
    }
    const allTags = input.topic.split(', ');

    if (isChallenge && !haveChallengeData) {
      let challengeId = null;

      await saveChallenge({
        variables: {
          name: inputChallenge.name,
          des: inputChallenge.des,
          startDate: moment(startDate).format('YYYY-MM-DDTHH:mm:ssZ'),
          endDate: moment(endDate).format('YYYY-MM-DDTHH:mm:ssZ'),
          level: input.level ? input.level : 1,
          desExercise: value,
          topic: allTags,
          metadata: caseData,
        },
        refetchQueries: [GET_ALL_EXERCISE],
        onCompleted: (data) => {
          challengeId = data.insert_challenges.returning[0].id;
        },
        onError: (error) => {
          alert(error.message);
        },
      });

      return uploadFile(file, challengeId, file.type, (url) => {
        updateChallengeImage({
          variables: {
            challengeId,
            image: url,
          },
          onCompleted: () => {
            alert('Thêm thử thách thành công');
            redirect();
          },
          onError: (error) => {
            alert(error.message);
          },
        });
      });
    }
    console.log(haveExerciseData);

    if (haveExerciseData) {
      updateExercise({
        variables: {
          exerciseId: exerciseData.id,
          name: input.name,
          level: input.level ? input.level : 1,
          des: value,
          topic: allTags,
          metadata: caseData,
          status: 'active',
          updatedAt: moment(),
          contestId,
          challengeId,
        },
        onCompleted: () => {
          handleChallengeUpdate(challengeId);
        },
        refetchQueries,

        onError: (err) => {
          alert(err.message);
        },
      });
    } else {
      saveExercise({
        variables: {
          name: input.name,
          level: input.level ? input.level : 1,
          des: value,
          topic: allTags,
          metadata: caseData,
          contestId,
        },
        refetchQueries,

        onError: (err) => {
          alert(err.message);
        },
      });
    }

    if (!contestId) {
      return navigate('/admin/problems');
    }

    return navigate(`/admin/contest/${contestId}`);
  };

  return (
    <Helmet title="Tạo bài tập">
      <div className="container-card">
        <div className="card">
          {!isChallenge && (
            <>
              <h3>Tạo bài toán</h3>
              <div className="card__item">
                <label>Tiêu đề: </label>
                <input
                  name="name"
                  onChange={handleChangeInput}
                  className="card__item-text card__item-input"
                  defaultValue={input.name}
                ></input>
              </div>
            </>
          )}
          <div className="card__item wrap">
            <label>Mức: </label>

            <select name="level" onChange={handleChangeInput} defaultValue={input.level}>
              <option value={1}>Dễ</option>
              <option value={2}>Trung bình</option>
              <option value={3}>Khó</option>
            </select>

            <label>Từ khóa: </label>
            <input
              name="topic"
              onChange={handleChangeInput}
              className="card__item-text card__item-input"
              defaultValue={input.topic}
            ></input>
          </div>
          <div className="card__item">
            <label>Nội dung: </label>
            <div data-color-mode="light">
              <div className="wmde-markdown-var"> </div>
              <MDEditor name="des" value={value} style={{ height: '600px' }} onChange={setValue} />
            </div>
          </div>

          <div name="topic" className="card__item ">
            <div className="problem_head">
              <div className="problem_head_title">
                <span>Tất cả các case</span>
              </div>
            </div>
          </div>

          {caseData.length > 0 &&
            caseData.map((item, index) => (
              <div key={index}>
                <div className="card__body">
                  <div className="card__body-control">
                    <input
                      value={item.input}
                      type="text"
                      name="input"
                      placeholder="Đầu vào"
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>
                  <div className="card__body-control">
                    <input
                      value={item.output}
                      type="text"
                      name="output"
                      placeholder="Đầu ra"
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>

                  <div className="card__body-control">
                    <input
                      value={item.point}
                      type="number"
                      name="point"
                      placeholder="Điểm"
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>
                  <div className="card__body-control">
                    <input
                      value={item.time}
                      type="text"
                      name="time"
                      placeholder="Thời gian"
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>
                  <div className="card__body-submit">
                    {caseData.length > 0 && (
                      <Button backgroundColor="red" className="btn" onClick={(e) => handleQuestionRemove(index)}>
                        Xóa
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          <div className="card__crud">
            <Button className="btn" onClick={handleQuestionAdd}>
              Thêm case
            </Button>

            <Button backgroundColor="green" onClick={handleSaveExercise}>
              {isChallenge ? (haveChallengeData ? 'Lưu thử thách' : 'Tạo thử thách') : 'Lưu bài toán'}
            </Button>
          </div>
        </div>
        {loading && <PageLoading />}
      </div>
    </Helmet>
  );
};

export default CreateExercise;
