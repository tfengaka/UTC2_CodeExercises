import { useMutation } from '@apollo/client';
import Button from 'components/Button';
import { UPDATE_CONTEST } from 'graphql/Mutation';
import { GET_CONTEST } from 'graphql/Queries';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

const UpdateContest = (props) => {
  const [updateContest] = useMutation(UPDATE_CONTEST);
  const show = props.show;
  const data = props.data;
  const [startDate, setStartDate] = useState(new Date(data.startDate));
  const [endDate, setEndDate] = useState(new Date(data.endDate));
  const [inputName, setInputName] = useState(data.name);
  const [inputDes, setInputDes] = useState(data.des);
  const onClose = props.onClose;
  if (!show) {
    return null;
  }

  const handleListUpdate = () => {
    updateContest({
      variables: {
        contestId: data.id,
        name: inputName,
        des: inputDes,
        startDate: moment(startDate).format('YYYY-MM-DDTHH:mm:ssZ'),
        endDate: moment(endDate).format('YYYY-MM-DDTHH:mm:ssZ'),
        status: 'active',
      },
      onCompleted: () => {
        alert('Cập nhật thành công');
        onClose();
      },
      onError: (error) => {
        alert('Tiêu đề đã tồn tại');
        console.log(error.message);
      },
      refetchQueries: [GET_CONTEST],
    });
  };

  const handleListReset = () => {
    setInputName(data.name);
    setInputDes(data.des);
    setStartDate(new Date(data.startDate));
    setEndDate(new Date(data.endDate));
    onClose();
  };
  return (
    <div className="update_container">
      <div className="update_description">
        <div className="close">
          <Button
            onClick={() => {
              handleListReset();
            }}
            className="btn"
          >
            X
          </Button>
        </div>
        <h1>Cập nhật cuộc thi</h1>
        <ul>
          <div className="update_card">
            <li>
              <h3>Tiêu đề</h3>
              <div className="update_card--input">
                <input
                  autoComplete="off"
                  spellCheck="false"
                  type="text"
                  placeholder="Tiêu đề"
                  onChange={(e) => setInputName(e.target.value)}
                  value={inputName}
                ></input>
              </div>
            </li>
            <li>
              <h3>Nội dung</h3>
              <div className="update_card--input">
                <textarea
                  autoComplete="off"
                  spellCheck="false"
                  placeholder="Nội dung"
                  onChange={(e) => setInputDes(e.target.value)}
                >
                  {inputDes}
                </textarea>
              </div>
            </li>
            <div className="datetime">
              <li>
                <h3>Ngày giờ bắt đầu</h3>
                <div className="update_card--input">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    timeInputLabel="Time:"
                    dateFormat="dd/MM/yyyy h:mm aa"
                    showTimeInput
                    minDate={new Date()}
                  />
                </div>
              </li>
              <li>
                <h3>Ngày giờ kết thúc</h3>
                <div className="update_card--input">
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    timeInputLabel="Time:"
                    dateFormat="dd/MM/yyyy h:mm aa"
                    showTimeInput
                    minDate={startDate}
                  />
                </div>
              </li>
            </div>
            <li>
              <div className="update_card--button">
                <Button
                  onClick={() => {
                    handleListUpdate();
                  }}
                >
                  Cập nhật
                </Button>
              </div>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default UpdateContest;
