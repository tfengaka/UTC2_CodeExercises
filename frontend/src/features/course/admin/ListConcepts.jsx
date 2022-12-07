import { useQuery } from '@apollo/client';
import Button from 'components/Button';
import Helmet from 'components/Helmet';
import PageLoading from 'components/PageLoading';
import ServerError from 'components/ServerError';
import { GET_ALL_CONCEPT_BY_COURSEID } from 'graphql/Queries';
import moment from 'moment';
import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { generateSubStr } from 'utils';
const ListConcepts = () => {
  const { id } = useParams();
  const { pathname, state } = useLocation();
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_ALL_CONCEPT_BY_COURSEID, { variables: { courseId: id } });
  if (loading) return <PageLoading />;
  if (error) {
    console.error(error.message);
    return <ServerError />;
  }
  return (
    <Helmet title={state.courseName || 'Khoá học'}>
      <div className="table">
        <div className="container">
          <div className="table_head">
            <div className="rollback" onClick={() => navigate(-1)}>
              <i className="bx bx-arrow-back"></i>
              <span>Quay lại</span>
            </div>
            <div className="table_head_title">
              <span>{state.courseName}</span>
            </div>
          </div>
          <div className="table_body">
            <div className="table_body_heading">
              <table>
                <colgroup>
                  <col width="10" />
                  <col width="100" />
                  <col />
                  <col width="200" />
                  <col width="300" />
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
                        <span>Cập nhật lúc</span>
                      </div>
                    </th>
                    <th className="table_body_heading_item">
                      <div className="table_cell">
                        <span>Thao Tác</span>
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
                  <col width="100" />
                  <col />
                  <col width="200" />
                  <col width="300" />
                </colgroup>
                {data.concepts.map((concept, index) => (
                  <Concept key={index} {...concept} location={pathname} navigate={navigate} />
                ))}
              </table>
            </div>
          </div>
        </div>
      </div>
    </Helmet>
  );
};

const Concept = ({ id, name, createdAt, location, navigate }) => {
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
          <span>{moment(createdAt).format('DD/MM/YYYY - hh:mm')}</span>
        </div>
      </td>
      <td className="table_body_content_item">
        <div className="table_cell actions">
          <Button backgroundColor="green" onClick={() => navigate(`${location}/${id}`)}>
            <i className="bx bxs-book-content"></i>
            <span>Chi tiết</span>
          </Button>
          <Button backgroundColor="red" onClick={() => {}}>
            <i className="bx bxs-trash"></i>
            <span>Gỡ bỏ</span>
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default ListConcepts;
