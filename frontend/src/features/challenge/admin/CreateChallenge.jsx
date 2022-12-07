import { useMutation } from '@apollo/client';
import Helmet from 'components/Helmet';

import { UPDATE_CHALLENGE } from 'graphql/Mutation';
import { GET_ALL_CHALLENGE } from 'graphql/Queries';
import moment from 'moment';
import CreateExercise from 'features/exercise/admin/CreateExercise';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { useLocation } from 'react-router-dom';

const CreateChallenge = () => {
  const [updateChallenge] = useMutation(UPDATE_CHALLENGE);
  const location = useLocation();
  const challengeData = location.state?.challengeData;
  const haveChallengeData = challengeData ? true : false;

  const [startDate, setStartDate] = useState(haveChallengeData ? new Date(challengeData.startDate) : Date.now());
  const [endDate, setEndDate] = useState(haveChallengeData ? new Date(challengeData.endDate) : Date.now());
  const [input, setInput] = useState(
    haveChallengeData
      ? {
          name: challengeData.name,
          des: challengeData.des,
          startDate,
          endDate,
        }
      : {},
  );

  const [file, setFile] = useState(null);
  const thumbnailRef = React.useRef(null);

  const handleChallengeUpdate = () => {
    updateChallenge({
      variables: {
        challengeId: challengeData.id,
        name: input.name,
        des: input.des,
        startDate: moment(startDate).format('YYYY-MM-DDTHH:mm:ssZ'),
        endDate: moment(endDate).format('YYYY-MM-DDTHH:mm:ssZ'),
        status: 'active',
      },
      onCompleted: () => {
        alert('Cập nhật thành công');
      },
      onError: (error) => {
        alert('Tiêu đề đã tồn tại');
        console.log(error.message);
      },
      refetchQueries: [GET_ALL_CHALLENGE],
    });
  };

  const handleChangeInput = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <Helmet title="Tạo Thử thách">
      <section className="challenge-admin post">
        <h3 className="challenge-admin__header">Tạo thử thách</h3>
        <h3 className="challenge-admin__label">Tiêu đề</h3>
        <div className="challenge-admin__title">
          <input
            value={input.name}
            name="name"
            type="text"
            placeholder="Tiêu đề...."
            className="input_control"
            onChange={(e) => handleChangeInput(e)}
          />
          <button onClick={() => thumbnailRef.current.click()}>
            {}
            <input type="file" style={{ display: 'none' }} ref={thumbnailRef} onChange={(e) => handleChange(e)} />
            <i className="bx bx-image-add" style={{ fontSize: '3rem' }}></i>
          </button>
        </div>
        <div className="challenge-admin__content">
          <h3>Nội dung</h3>
          <div className="challenge-admin__content__input">
            <textarea
              name="des"
              value={input.des}
              autoComplete="off"
              spellCheck="false"
              placeholder="Nội dung"
              onChange={(e) => handleChangeInput(e)}
            ></textarea>
            <div
              style={{
                width: '100%',
                maxWidth: '760px',
                padding: '40px',
                height: '615px',
                backgroundColor: '#eee',
              }}
            >
              {(file || haveChallengeData) && (
                <img
                  src={!haveChallengeData ? URL.createObjectURL(file) : challengeData.image}
                  alt=""
                  style={{
                    width: '100%',
                    maxWidth: '450px',
                    height: '100%',
                    transform: 'translateX(127px)',
                  }}
                />
              )}
            </div>
          </div>
        </div>
        <div className="datetime">
          <div>
            <h3>Ngày giờ bắt đầu</h3>
            <div className="create_card--input">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                timeInputLabel="Time:"
                dateFormat="dd/MM/yyyy h:mm aa"
                showTimeInput
                minDate={new Date()}
              />
            </div>
          </div>
          <div>
            <h3>Ngày giờ kết thúc</h3>
            <div className="create_card--input">
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                timeInputLabel="Time:"
                dateFormat="dd/MM/yyyy h:mm aa"
                showTimeInput
                minDate={startDate}
              />
            </div>
          </div>
        </div>
        <CreateExercise
          isChallenge={true}
          inputChallenge={input}
          file={file}
          startDate={startDate}
          endDate={endDate}
          haveChallengeData={haveChallengeData}
          handleChallengeUpdate={handleChallengeUpdate}
          challengeId={challengeData?.id}
        />
      </section>
    </Helmet>
  );
};

export default CreateChallenge;
