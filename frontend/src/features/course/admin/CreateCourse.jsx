import { useMutation } from '@apollo/client';
import Button from 'components/Button';
import Helmet from 'components/Helmet';
import PageLoading from 'components/PageLoading';
import { INSERT_COURSE } from 'graphql/Mutation';
import { GET_ALL_COURSE } from 'graphql/Queries';
import { useFirebase } from 'hooks/useFirebase';
import { useRedirect } from 'hooks/useRedirect';
import React from 'react';

const initialTopic = [
  {
    priority: 1,
    name: '',
    des: '',
  },
];

const CreateCourse = () => {
  const [heading, setHeading] = React.useState('');
  const [desc, setDesc] = React.useState('');
  const [banner, setBanner] = React.useState(null);
  const bannerRef = React.useRef(null);
  const [isHaveCourse, setIsHaveCourse] = React.useState(false);
  const [topics, setTopics] = React.useState([]);
  const [insertCourse] = useMutation(INSERT_COURSE);
  const { redirect } = useRedirect('course');
  const { loading, uploadFile } = useFirebase('courseBanner');
  const handleLoadBanner = (e) => {
    const bannerFile = e.target.files[0];
    if (bannerFile) {
      setBanner(bannerFile);
    }
  };
  const comfirmCourse = () => {
    if (heading === '' || desc === '') {
      alert('Vui lòng nhập đầy đủ thông tin!');
      return;
    }
    setIsHaveCourse(true);
  };
  const handleSubmitCourse = async () => {
    if (!banner || topics.length === 0) {
      alert('Một vài thông tin còn đang thiếu!\nVui lòng kiểm tra lại!');
      return;
    }
    const tempURL = URL.createObjectURL(banner);
    const fileName = tempURL.slice(tempURL.length - 12);
    await uploadFile(banner, fileName, banner.type, (bannerRrl) => {
      insertCourse({
        variables: { courseName: heading, courseDes: desc, banner: bannerRrl, concepts: topics },
        refetchQueries: [{ query: GET_ALL_COURSE }],
        onCompleted: () => {
          alert('Tạo khóa học thành công!');
          redirect();
        },
        onError: (error) => {
          alert('Tạo khóa học thất bại!\nVui lòng thử lại sau!');
          console.error(error.message);
        },
      });
    });
  };
  return (
    <Helmet title="Tạo khóa học">
      {loading && <PageLoading />}
      <div className="course create">
        <div className="container">
          <div className="rollback" onClick={() => redirect()}>
            <i className="bx bx-arrow-back"></i>
            <span>Quay lại</span>
          </div>
          <div className="course create_head">
            <span className="course title">Tạo mới khoá học</span>
          </div>

          <div className="course_title">
            <span className="course title">Tiêu đề khoá học:</span>
            <input
              type="text"
              className="input_control"
              placeholder="Tiêu đề khóa học...."
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              disabled={isHaveCourse}
            />
          </div>
          <div className="course_banner">
            <div className="course_banner_img" onClick={() => bannerRef.current.click()}>
              <input type="file" ref={bannerRef} style={{ display: 'none' }} onChange={(e) => handleLoadBanner(e)} />
              {!banner ? (
                <label className="handler">
                  <i className="bx bxs-cloud-upload"></i>
                  Tải ảnh bìa lên ở đây....
                </label>
              ) : (
                <div className="img_wrapper">
                  <img src={URL.createObjectURL(banner)} alt="" />
                </div>
              )}
            </div>
          </div>
          <div className="course_desc">
            <div className="course_desc_head">
              <span className="course title">Mô tả khóa học</span>
            </div>
            <textarea
              spellCheck={false}
              placeholder="Mô tả khóa học...."
              className="input_control"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              disabled={isHaveCourse}
            />
            {!isHaveCourse ? (
              <Button size="full" backgroundColor="blue" onClick={() => comfirmCourse()}>
                Thêm chủ đề cho khoá học
              </Button>
            ) : (
              <Button size="full" onClick={() => setIsHaveCourse(false)}>
                Chỉnh sửa lại thông tin khoá học
              </Button>
            )}
          </div>
          {isHaveCourse && (
            <>
              <div className="divider"></div>
              <div className="course_topics">
                <div className="course_topics_head">
                  <span className="course title">Nội dung</span>
                </div>
                {topics.length > 0 &&
                  topics.map((topic, index) => (
                    <TopicItem key={index} value={topic} onPushTopic={setTopics} isComfirm={true} />
                  ))}
                <TopicItem value={initialTopic} onPushTopic={setTopics} />
                <Button size="full" backgroundColor="green" onClick={() => handleSubmitCourse()}>
                  Xác nhận thêm khoá học mới
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </Helmet>
  );
};

const TopicItem = ({ value, onPushTopic, isComfirm }) => {
  const [title, setTitle] = React.useState(value.name || '');
  const [priority, setPriority] = React.useState(value.priority || 1);
  const inputRef = React.useRef(null);
  const handlePushTopic = () => {
    if (title === '') {
      alert('Chủ đề không được để trống!');
      inputRef.current.focus();
      return;
    }
    onPushTopic((prev) => [...prev, { name: title, des: title, priority: priority }]);
    setTitle('');
    setPriority(priority + 1);
  };
  const handleRemoveTopic = () => {
    onPushTopic((prev) => {
      console.log(prev);
      return prev.filter((item) => item.priority !== priority);
    });
  };
  return (
    <div className="topic">
      <div className="topic_title">
        <input
          type="text"
          className="input_control"
          placeholder="Tiêu đề...."
          value={title}
          ref={inputRef}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isComfirm}
        />
        {!isComfirm ? (
          <Button backgroundColor="blue" onClick={() => handlePushTopic()}>
            Xác nhận
          </Button>
        ) : (
          <Button backgroundColor="red" onClick={() => handleRemoveTopic()}>
            Gỡ bỏ
          </Button>
        )}
      </div>
    </div>
  );
};

export default CreateCourse;
