import { useMutation, useQuery } from '@apollo/client';
import Button from 'components/Button';
import Helmet from 'components/Helmet';
import PageLoading from 'components/PageLoading';
import { UPDATE_PROBLEM } from 'graphql/Mutation';
import { GET_ALL_EXERCISE } from 'graphql/Queries';
import moment from 'moment';
import { Link } from 'react-router-dom';

const ListExercise = () => {
  let { loading, error, data } = useQuery(GET_ALL_EXERCISE);

  if (loading) return <PageLoading />;
  if (error) return <div>Load data failed</div>;
  return (
    <Helmet title="Danh sách bài tập">
      <div className="table">
        <div className="container">
          <div className="table_head">
            <div className="table_head_title">
              <span>Danh sách bài tập</span>
            </div>
          </div>

          <div className="table_body">
            <div className="table_body_heading">
              <table>
                <colgroup>
                  <col width="40" />
                  <col width="120" />
                  <col width="400" />
                  <col width="120" />
                  <col width="450" />
                  <col width="300" />
                  <col width="200" />
                </colgroup>
                <thead>
                  <tr>
                    <th className="table_body_heading_item">
                      <div className="table_cell">
                        <span> </span>
                      </div>
                    </th>
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
                  <col width="40" />
                  <col width="120" />
                  <col width="400" />
                  <col width="120" />
                  <col width="450" />
                  <col width="300" />
                  <col width="200" />
                </colgroup>
                <tbody>
                  {data?.exercises.map((item, index) => (
                    <TableRow key={index} data={item} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Helmet>
  );
};

const TableRow = ({ data }) => {
  const { id, name, des, level, topic, updatedAt, metadata } = data;
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
      refetchQueries: [GET_ALL_EXERCISE],
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
          <span>{moment(updatedAt).format('DD/MM/YYYY - HH:MM:ss')}</span>
        </div>
      </td>
      <td className="table_body_content_item">
        <div className="table_cell actions">
          <Link to="/admin/problems/update" state={{ exerciseData: data }}>
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

export default ListExercise;
