import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_EXERCISE, GET_ALL_EXERCISE_CONTEST } from 'graphql/Queries';
import { Link, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import Button from 'components/Button';
import { UPDATE_PROBLEM } from 'graphql/Mutation';

const ListQuestionContest = () => {
  const { id } = useParams();

  const { loading, error, data } = useQuery(GET_ALL_EXERCISE_CONTEST, { variables: { contestId: id } });
  if (loading) return <div className="loading"></div>;
  if (error) return <div>Load data failed</div>;

  const exerciseList = data?.contests_by_pk?.exercises || [];

  return (
    <div style={{ padding: '16px' }}>
      <div className="table">
        <div className="container">
          <div className="table_head">
            <div className="table_head_title">
              <span>Danh sách câu hỏi</span>
            </div>
          </div>

          <div className="table_body">
            <div className="table_body_heading">
              <table>
                <colgroup>
                  <col width="30" />
                  <col width="120" />
                  <col width="400" />
                  <col width="150" />
                  <col width="400" />
                  <col width="200" />
                  <col width="200" />
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
                        <span>Độ khó</span>
                      </div>
                    </th>
                    <th className="table_body_heading_item">
                      <div className="table_cell">
                        <span>Chủ đề</span>
                      </div>
                    </th>
                    <th className="table_body_heading_item">
                      <div className="table_cell">
                        <span>Cập nhật lúc</span>
                      </div>
                    </th>
                    <th className="table_body_heading_item">
                      <div className="table_cell">
                        <span>Thao tác</span>
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
                  <col width="400" />
                  <col width="150" />
                  <col width="400" />
                  <col width="200" />
                  <col width="200" />
                </colgroup>
                <tbody>
                  {exerciseList?.map((item, index) => (
                    <TableRow key={index} data={item} contestId={id} />
                  ))}
                </tbody>
              </table>
            </div>
            <div className="table_body_button">
              <Link to={`/admin/contest/${id}/problems/create`} state={{ contestId: id }}>
                <Button backgroundColor="blue">
                  <i className="bx bx-plus"></i>Thêm câu hỏi
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TableRow = ({ data, contestId }) => {
  const { id, des, name, level, topic, updatedAt, metadata } = data;
  const displayID = id.substr(0, 8).toUpperCase();
  let levelName = '';
  let levelColor = '';

  switch (level) {
    case 1:
      levelName = 'Dễ';
      levelColor = 'green';
      break;
    case 2:
      levelName = 'Trung bình';
      levelColor = 'blue';
      break;
    case 3:
      levelName = 'Khó';
      levelColor = 'orange';
      break;
    default:
      break;
  }

  const [removeProblem] = useMutation(UPDATE_PROBLEM);
  const handleListRemove = () => {
    removeProblem({
      variables: { exerciseId: id, des, name, topic, level, updatedAt, metadata, status: 'deleted' },
      onCompleted: () => {
        alert('Xóa thành công');
      },
      onError: (error) => {
        alert(error.message);
      },
      refetchQueries: [GET_ALL_EXERCISE_CONTEST, GET_ALL_EXERCISE],
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
          <div className={`tag bg-${levelColor}`}>
            <span>{levelName}</span>
          </div>
        </div>
      </td>
      <td className="table_body_content_item">
        <div className="table_cell">
          {topic.map((item, index) => (
            <div key={index} className="tag topic">
              <span>{item}</span>
            </div>
          ))}
        </div>
      </td>
      <td className="table_body_content_item">
        <div className="table_cell">
          <span>{format(new Date(updatedAt), 'dd-MM-yyyy - HH:mm:ss')}</span>
        </div>
      </td>
      <td className="table_body_content_item">
        <div className="table_cell actions">
          <Link to={`/admin/contest/${contestId}/problems/update`} state={{ exerciseData: data, contestId: contestId }}>
            <Button backgroundColor="blue">
              <i className="bx bxs-edit"></i>
              <span>Sửa</span>
            </Button>
          </Link>

          <Button backgroundColor="red" onClick={() => handleListRemove(id)}>
            <i className="bx bxs-trash"></i>
            <span>Xóa</span>
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default ListQuestionContest;
