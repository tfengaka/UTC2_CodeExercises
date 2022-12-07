import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_CHALLENGE } from 'graphql/Queries';
import { format, parse } from 'date-fns';
import Button from 'components/Button';
import { UPDATE_CHALLENGE } from 'graphql/Mutation';
import { Link } from 'react-router-dom';

const ChallengesListAdmin = () => {
  let { loading, error, data } = useQuery(GET_ALL_CHALLENGE);

  if (loading) return <div className="loading"></div>;
  if (error) return <div>Load data failed</div>;

  return (
    <div style={{ padding: '16px' }}>
      <div className="table">
        <div className="container">
          <div className="table_head">
            <div className="table_head_title">
              <span>Danh sách thử thách</span>
            </div>
          </div>

          <div className="table_body">
            <div className="table_body_heading">
              <table>
                <colgroup>
                  <col width="30" />
                  <col width="120" />
                  <col width="350" />
                  <col width="150" />
                  <col width="150" />
                  <col width="120" />
                  <col width="140" />
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
                        <span>Tạo bởi</span>
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
                  <col width="350" />
                  <col width="150" />
                  <col width="150" />
                  <col width="120" />
                  <col width="140" />
                </colgroup>
                <tbody>
                  {data?.challenges.map((item, index) => (
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
  const { id, name, des, startDate, endDate, account, exercises } = data;
  const displayID = id.substr(0, 8).toUpperCase();

  const [removeChallenge] = useMutation(UPDATE_CHALLENGE);

  const handleListRemove = () => {
    removeChallenge({
      variables: { challengeId: id, status: 'deleted', name: '[deleted]' + name, des, startDate, endDate },
      onCompleted: () => {
        alert('Xóa thành công');
      },
      onError: (error) => {
        alert(error.message);
      },
      refetchQueries: [GET_ALL_CHALLENGE],
    });
  };

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
        <div className="table_cell">
          <span>{format(parse(startDate, "yyyy-MM-dd'T'HH:mm:ssxxx", new Date()), 'dd-MM-yyyy h:mm aa')}</span>
        </div>
      </td>
      <td className="table_body_content_item">
        <div className="table_cell">
          <span>{format(parse(endDate, "yyyy-MM-dd'T'HH:mm:ssxxx", new Date()), 'dd-MM-yyyy h:mm aa')}</span>
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
        <div className="table_cell tool">
          <Link to="/admin/challenge/update" state={{ exerciseData: exercises[0], challengeData: data }}>
            <Button backgroundColor="blue">
              <i className="bx bxs-edit"></i>Sửa
            </Button>
          </Link>
          <Button backgroundColor="red" onClick={() => handleListRemove()}>
            <i className="bx bxs-trash-alt"></i>Xóa
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default ChallengesListAdmin;
