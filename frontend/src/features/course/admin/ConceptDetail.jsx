import { useQuery } from '@apollo/client';
import Button from 'components/Button';
import PageLoading from 'components/PageLoading';
import ServerError from 'components/ServerError';
import { GET_CONCEPT_BY_ID } from 'graphql/Queries';
import moment from 'moment';
import React from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { generateSubStr } from 'utils';
const ConceptDetail = () => {
  const navigate = useNavigate();
  const { conceptID } = useParams();
  const { pathname } = useLocation();
  const { loading, error, data } = useQuery(GET_CONCEPT_BY_ID, { variables: { conceptId: conceptID } });
  const [isEditing, setIsEditing] = React.useState(false);
  const conceptNameRef = React.useRef(null);
  if (loading) return <PageLoading />;
  if (error) {
    console.error(error.message);
    return <ServerError />;
  }
  const { name, exercises } = data.concepts_by_pk;
  return (
    <div className="concept">
      <div className="table_head">
        <div className="rollback" onClick={() => navigate(-1)}>
          <i className="bx bx-arrow-back"></i>
          <span>Quay lại</span>
        </div>
        <div className="table_head_title">
          <span>{name}</span>
        </div>
        {isEditing ? (
          <Button
            onClick={() => {
              setIsEditing(false);
            }}
          >
            <i className="bx bx-save"></i>
            <span>Lưu</span>
          </Button>
        ) : (
          <Button backgroundColor="blue" onClick={() => setIsEditing(true)}>
            <i className="bx bxs-edit"></i>
            Chỉnh sửa
          </Button>
        )}
      </div>
      <div className="container">
        <div className="course_title">
          <span className="course title">Tiêu đề :</span>
          <div className="topic_title">
            <input
              type="text"
              className="input_control"
              placeholder="Tiêu đề...."
              defaultValue={name}
              ref={conceptNameRef}
              disabled={!isEditing}
            />
          </div>
        </div>
        <div className="concept_exercises">
          <div className="table">
            <div className="table_head">
              <div className="table_head_title">
                <span>Danh sách bài tập</span>
              </div>
            </div>

            <div className="table_body">
              <div className="table_body_heading">
                <table>
                  <colgroup>
                    <col width="10" />
                    <col width="120" />
                    <col width="400" />
                    <col width="100" />
                    <col width="200" />
                    <col width="180" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th className="table_body_heading_item">
                        <div className="table_cell"></div>
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
                    <col width="10" />
                    <col width="120" />
                    <col width="400" />
                    <col width="100" />
                    <col width="200" />
                    <col width="180" />
                  </colgroup>
                  <tbody>
                    {exercises.map((exercise, index) => (
                      <Exercise key={index} isEditing={isEditing} {...exercise} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="concept_exercises_add">
            <Link to={`${pathname}/problems/create`} state={{ conceptID: conceptID, conceptName: name }}>
              <Button size="full" backgroundColor="green">
                <i className="bx bx-plus"></i>
                Thêm bài tập
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const Exercise = ({ id, name, level, updateAt, isEditing }) => {
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
  return (
    <tr className="table_row">
      <td className="table_body_content_item"></td>
      <td className="table_body_content_item">
        <div className="table_cell">
          <span>{`${generateSubStr(id, 8)}...`}</span>
        </div>
      </td>
      <td className="table_body_content_item">
        <div className="table_cell">
          <span>{name}</span>
        </div>
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
          <span>{moment(updateAt).format('DD/MM/YYYY - hh:mm')}</span>
        </div>
      </td>
      <td className="table_body_content_item">
        <div className="table_cell actions">
          <Button backgroundColor="blue" isDisabled={true}>
            <i className="bx bx-low-vision"></i>
            <span>Xem</span>
          </Button>
          <Button backgroundColor="red" onClick={() => {}} isDisabled={!isEditing}>
            <i className="bx bxs-trash"></i>
            <span>Xóa</span>
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default ConceptDetail;
