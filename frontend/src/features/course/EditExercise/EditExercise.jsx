import Button from 'components/Button';
import Dropdown from 'components/Dropdown';
import TestCaseInput from './TestCaseInput';
import MDEditor from 'components/MarkDownEdior/MDEditor';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './EditExercise.module.scss';
import { useMutation } from '@apollo/client';
import { INSERT_EXERCISE_CONCEPT } from 'graphql/Mutation';
import Helmet from 'components/Helmet';
import PageLoading from 'components/PageLoading';
import { GET_CONCEPT_BY_ID } from 'graphql/Queries';

const levelOptions = [
  {
    value: 1,
    name: 'Dễ',
  },
  {
    value: 2,
    name: 'Trung bình',
  },
  {
    value: 3,
    name: 'Khó',
  },
];

const EditExercise = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { conceptID, conceptName } = state;
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [level, setLevel] = React.useState({
    value: 1,
    name: 'Dễ',
  });
  const [testcases, setTestcases] = React.useState([]);
  const [isAddTestCase, setIsAddTestCase] = React.useState(false);
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [submitExerciseConcept, { loading }] = useMutation(INSERT_EXERCISE_CONCEPT);
  const onSubmitExercise = () => {
    const submitData = {
      conceptId: conceptID,
      title,
      content,
      level: level.value,
      topic: [conceptName],
      metadata: testcases,
    };
    submitExerciseConcept({
      variables: { ...submitData },
      refetchQueries: [GET_CONCEPT_BY_ID],
      onCompleted: () => {
        alert('Thêm bài tập thành công');
        navigate(-1);
      },
      onError: (error) => {
        alert('Thêm bài tập thất bại');
        console.error(error.message);
      },
    });
  };

  return (
    <Helmet title="Thêm bài tập">
      {loading && <PageLoading />}
      <div className={styles.exercise}>
        <div className="table_head">
          <div className="rollback" onClick={() => navigate(-1)}>
            <i className="bx bx-arrow-back"></i>
            <span>Quay lại</span>
          </div>
          <div className={styles.btnSave}>
            <Button size="full" onClick={() => onSubmitExercise()}>
              <i className="bx bx-save"></i>
              <span>Lưu</span>
            </Button>
          </div>
          <div className="table_head_title">
            <span>{conceptName}</span>
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.exercise_title}>
            <span className="course title">Chủ đề:</span>
            <div className={styles.exercise_title_input}>
              <input
                type="text"
                className="input_control"
                placeholder="Tiêu đề...."
                value={conceptName}
                disabled={true}
              />
            </div>
          </div>
          <div className={styles.exercise_title}>
            <span className="course title">Tiêu đề bài tập - Độ khó</span>
            <div className={styles.exercise_title_input}>
              <input
                type="text"
                className="input_control"
                placeholder="Tiêu đề...."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div
                className={`${styles.exercise_dropdown} ${showDropdown && styles.active}`}
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <span>{level.name}</span>
                <i className="bx bx-chevron-down"></i>
                {showDropdown && (
                  <Dropdown setActive={setShowDropdown}>
                    {levelOptions.map((item, index) => (
                      <div
                        key={index}
                        className="dropdown_item"
                        onClick={() => {
                          setShowDropdown(false);
                          setLevel(item);
                        }}
                      >
                        {item.name}
                      </div>
                    ))}
                  </Dropdown>
                )}
              </div>
            </div>
          </div>

          <div className={styles.exercise_content}>
            <span className="course title">Nội dung bài tập</span>
            <MDEditor style={{ height: '500px' }} value={content} onChange={setContent} />
          </div>
          <div className={styles.exercise_testcases}>
            <div className="table">
              <div className="table_head">
                <div className="table_head_title">
                  <span className="course title">Testcase</span>
                </div>
              </div>
              <div className="table_body">
                <div className="table_body_heading">
                  <table>
                    <colgroup>
                      <col width="10" />
                      <col width="50" />
                      <col width="250" />
                      <col width="250" />
                      <col width="150" />
                      <col width="100" />
                      <col width="200" />
                    </colgroup>
                    <thead>
                      <tr>
                        <th className="table_body_heading_item"></th>
                        <th className="table_body_heading_item">
                          <div className="table_cell">
                            <span>STT</span>
                          </div>
                        </th>
                        <th className="table_body_heading_item">
                          <div className="table_cell">
                            <span>Dữ liệu vào</span>
                          </div>
                        </th>
                        <th className="table_body_heading_item">
                          <div className="table_cell">
                            <span>Kết quả</span>
                          </div>
                        </th>
                        <th className="table_body_heading_item">
                          <div className="table_cell">
                            <span>Thời gian chạy tối đa</span>
                          </div>
                        </th>
                        <th className="table_body_heading_item">
                          <div className="table_cell">
                            <span>Điểm</span>
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
                      <col width="15" />
                      <col width="50" />
                      <col width="250" />
                      <col width="250" />
                      <col width="150" />
                      <col width="100" />
                      <col width="200" />
                    </colgroup>
                    <tbody>
                      {testcases.map((item, index) => (
                        <TestcaseItem key={index} index={index + 1} {...item} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {isAddTestCase ? (
            <TestCaseInput setIsAddTestCase={setIsAddTestCase} pushTestCase={setTestcases} />
          ) : (
            <Button size="full" backgroundColor="blue" onClick={() => setIsAddTestCase(true)}>
              <i className="bx bx-plus"></i>
              Thêm TestCase mới
            </Button>
          )}
        </div>
      </div>
    </Helmet>
  );
};
const TestcaseItem = ({ index, input, output, time, point }) => {
  return (
    <tr className="table_row">
      <td className="table_body_content_item"></td>
      <td className="table_body_content_item">
        <div className="table_cell">
          <span>{index}</span>
        </div>
      </td>
      <td className="table_body_content_item">
        <div className="table_cell">
          <span>{input}</span>
        </div>
      </td>
      <td className="table_body_content_item">
        <div className="table_cell">
          <span>{output}</span>
        </div>
      </td>
      <td className="table_body_content_item">
        <div className="table_cell">
          <span>{`${time} ms`}</span>
        </div>
      </td>
      <td className="table_body_content_item">
        <div className="table_cell">
          <span>{`${point} Điểm`}</span>
        </div>
      </td>
      <td className="table_body_content_item">
        <div className="table_cell">
          <Button backgroundColor="red" onClick={() => {}} isDisabled={true}>
            <i className="bx bxs-trash"></i>
            <span>Gỡ bỏ</span>
          </Button>
        </div>
      </td>
    </tr>
  );
};
export default EditExercise;
