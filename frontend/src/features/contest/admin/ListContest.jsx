import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_CONTEST } from 'graphql/Queries';
import { format } from 'date-fns';
import Button from 'components/Button';
import UpdateContest from './UpdateContest';
import { UPDATE_CONTEST } from 'graphql/Mutation';
import { Link } from 'react-router-dom';

const ListContest = () => {
  let { loading, error, data } = useQuery(GET_CONTEST);

  if (loading) return <div className="loading"></div>;
  if (error) return <div>Load data failed</div>;

  return (
    <div style={{ padding: '16px' }}>
      <div className="table">
        <div className="container">
          <div className="table_head">
            <div className="table_head_title">
              <span>Danh sách cuộc thi</span>
            </div>
          </div>

          <div className="table_body">
            <div className="table_body_heading">
              <table>
                <colgroup>
                  <col width="30" />
                  <col width="120" />
                  <col width="150" />
                  <col width="300" />
                  <col width="250" />
                  <col width="250" />
                  <col width="200" />
                  <col width="120" />
                  <col width="150" />
                  <col width="380" />
                </colgroup>
                <thead>
                  <tr>
                    <th className="table_body_heading_item"></th>
                    <th className="table_body_heading_item">
                      <div className="table_cell">
                        <span>ID</span>
                      </div>
                    </th>
                    <th className="table_body_heading_item">
                      <div className="table_cell">
                        <span>Tiêu đề</span>
                      </div>
                    </th>
                    <th className="table_body_heading_item">
                      <div className="table_cell">
                        <span>Nội dung</span>
                      </div>
                    </th>
                    <th className="table_body_heading_item">
                      <div className="table_cell">
                        <span>Ngày bắt đầu</span>
                      </div>
                    </th>
                    <th className="table_body_heading_item">
                      <div className="table_cell">
                        <span>Ngày kết thúc</span>
                      </div>
                    </th>
                    <th className="table_body_heading_item">
                      <div className="table_cell">
                        <span>Thời gian làm bài</span>
                      </div>
                    </th>
                    <th className="table_body_heading_item">
                      <div className="table_cell">
                        <span>Tạo bởi</span>
                      </div>
                    </th>
                    <th className="table_body_heading_item">
                      <div className="table_cell">
                        <span>Trạng thái</span>
                      </div>
                    </th>
                    <th className="table_body_heading_item">
                      <div className="table_cell">
                        <span> </span>
                      </div>
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
            <div className="table_body_content">
              <table>
                <colgroup>
                  <col width="30" />
                  <col width="120" />
                  <col width="150" />
                  <col width="300" />
                  <col width="250" />
                  <col width="250" />
                  <col width="200" />
                  <col width="120" />
                  <col width="150" />
                  <col width="330" />
                </colgroup>
                <tbody>
                  {data?.contests.map((item, index) => (
                    <TableRow key={index} data={item} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TableRow = ({ data }) => {
  const { id, name, des, startDate, endDate, time, account, status } = data;
  const displayID = id.substr(0, 8).toUpperCase();
  const [show, setShow] = useState(false);

  const [removeContest] = useMutation(UPDATE_CONTEST);

  const handleListRemove = () => {
    removeContest({
      variables: { contestId: id, status: 'deleted', name: '[deleted]' + name, des, startDate, endDate },
      onCompleted: () => {
        alert('Xóa thành công');
      },
      onError: (error) => {
        alert(error.message);
      },
      refetchQueries: [GET_CONTEST],
    });
  };

  const result = new Date(time).toISOString().slice(11, 19);

  return (
    <tr className="table_row">
      <td className="table_body_content_item"></td>
      <td className="table_body_content_item">
        <div className="table_cell">{displayID}</div>
      </td>
      <td className="table_body_content_item">
        <div className="table_cell">{name}</div>
      </td>
      <td className="table_body_content_item">
        <div className="table_cell">{des}</div>
      </td>
      <td className="table_body_content_item">
        <div className="table_cell">
          <span>{format(new Date(startDate), 'dd-MM-yyyy - HH:mm:ss')}</span>
        </div>
      </td>
      <td className="table_body_content_item">
        <div className="table_cell">
          <span>{format(new Date(endDate), 'dd-MM-yyyy - HH:mm:ss')}</span>
        </div>
      </td>
      <td className="table_body_content_item">
        <div className="table_cell">
          <span>{result}</span>
        </div>
      </td>
      <td className="table_body_content_item">
        <div className="table_cell">
          {account ? (
            <img id="avatar-contest_list" src={account?.avatarUrl} alt="" />
          ) : (
            <i className="bx bxs-user-circle" style={{ fontSize: 40 }}></i>
          )}
        </div>
      </td>
      <td className="table_body_content_item">
        <div className="table_cell">{status}</div>
      </td>
      <td className="table_body_content_item">
        <div className="table_cell tool">
          <Button
            backgroundColor="green"
            onClick={() => {
              setShow(true);
            }}
          >
            <i className="bx bxs-edit"></i>Sửa
          </Button>
          <Button backgroundColor="red" onClick={() => handleListRemove()}>
            <i className="bx bxs-trash-alt"></i>Xóa
          </Button>
          <Link to={`${id}`} state={{ contestId: id }}>
            <Button backgroundColor="blue">
              <i className="bx bx-question-mark"></i>Câu hỏi
            </Button>
          </Link>
        </div>
      </td>
      <td className="table_body_content_item">
        <UpdateContest show={show} data={{ id, name, des, startDate, endDate }} onClose={() => setShow(false)} />
      </td>
    </tr>
  );
};

export default ListContest;
