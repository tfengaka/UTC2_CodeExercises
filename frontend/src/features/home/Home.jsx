import Button from 'components/Button';
import React from 'react';
import { Link } from 'react-router-dom';
import banner from 'assets/images/banner.png';
import intro from 'assets/images/intro.jpg';
import LearnCode from 'assets/images/learn-code.png';
import ExerciseCode from 'assets/images/exercise-code.png';
import ContestCode from 'assets/images/contest-code.png';
import UTC2 from 'assets/images/utc2.jpg';

const Home = () => {
  return (
    <div className="home">
      <header className="home__header">
        <div className="home__header-banner">
          <div className="home__header-container">
            <h1>Hãy bắt đầu lập trình cùng chúng tôi</h1>
            <h3>Đăng ký và tham gia cộng đồng nhà phát triển tốt nhất!</h3>
            <Link to="/course">
              <Button size="lg">Hãy bắt đầu ngay</Button>
            </Link>
          </div>
        </div>
      </header>
      <img src={UTC2} alt="" className="home__header-img" />
      <main>
        <div className="home__intro">
          <h2 className="home__title-intro">Các skill mà chúng tôi mang lại</h2>

          <div className="home__info">
            <img src={intro} alt="" className="home__info-img" />
            <div className="home__info-right">
              <div className="home__info-right__item">
                <h3>Cải thiện kỹ năng lập trình</h3>
                <p>
                  Học viết mã giúp bạn cải thiện tư duy logic và đưa bạn lên một tầm cao mới trong việc giải quyết vấn
                  đề
                </p>
              </div>
              <div className="home__info-right__item">
                <h3>Làm quen với thế giới công nghệ</h3>
                <p>Học code để bước vào thế giới Công nghệ thông tin và thích ứng với Công nghiệp 4.0.</p>
              </div>
              <div className="home__info-right__item">
                <h3>Nhận nhiều cơ hội việc làm hơn</h3>
                <p>
                  Công việc lập trình đang tăng trưởng nhanh hơn 50% so với thị trường việc làm nói chung với mức lương
                  trung bình cao hơn 30% so với các công việc khác.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="home__roadmap">
          <h2 className="home__title-roadmap">Lộ trình để trở thành lập trình viên</h2>
          <div className="home__step-list">
            <Link to="/course">
              <div className="home__step-tiem">
                <div className="home__step-img">
                  <img src={LearnCode} alt="" />
                </div>
                <div className="home__step-title">Học tập</div>
                <div className="home__step-des">
                  Bắt đầu học với một loạt các khóa học từ cơ bản đến nâng cao do các thầy cô tạo ra.
                </div>
              </div>
            </Link>

            <Link to="/problem">
              <div className="home__step-tiem">
                <div className="home__step-img">
                  <img src={ExerciseCode} alt="" />
                </div>
                <div className="home__step-title">Luyện tập</div>
                <div className="home__step-des">
                  Nâng cao kỹ năng lập trình của bạn mỗi ngày với thư viện hơn 1000 thử thách của chúng tôi.
                </div>
              </div>
            </Link>
            <Link to="/contest">
              <div className="home__step-tiem">
                <div className="home__step-img">
                  <img src={ContestCode} alt="" />
                </div>
                <div className="home__step-title">Thi đấu</div>
                <div className="home__step-des">
                  Tham gia vào các cuộc thi để kiểm tra tính đam mê trong bạn và cải thiện kỹ năng viết mã của bạn.
                </div>
              </div>
            </Link>
          </div>
        </div>
      </main>

      <footer className="home__footer">
        <div className="home__footer-left">
          <div className="header__menu__banner home__footer-img">
            <Link to="/">
              <img src={banner} alt="" />
            </Link>
          </div>
          <div className="home__footer-left__des">
            CodingWar là một nền tảng trực tuyến giúp người dùng học hỏi, rèn luyện kỹ năng viết mã và tham gia các cuộc
            thi viết mã trực tuyến.
          </div>
          <div className="home__footer-left__network">
            <i className="bx bxl-facebook-circle home__footer-left__network-item"></i>
            <i className="bx bxl-google-plus-circle home__footer-left__network-item"></i>
            <i className="bx bxl-youtube home__footer-left__network-item"></i>
            <i className="bx bxl-instagram-alt home__footer-left__network-item"></i>
          </div>
        </div>
        <div className="home__footer-right">
          <div className="home__footer-right__item">
            Liên kết
            <div className="home__footer-right__select">Học hỏi </div>
            <div className="home__footer-right__select">Tập huấn</div>
          </div>
          <div className="home__footer-right__item">
            Thông tin
            <div className="home__footer-right__select">Giới thiệu</div>
            <div className="home__footer-right__select">Điều khoản sử dụng</div>
          </div>
          <div className="home__footer-right__item">
            Trợ giúp
            <div className="home__footer-right__select">Giúp đỡ </div>
            <div className="home__footer-right__select">Thảo luận</div>
            <div className="home__footer-right__select">Liên hệ với chúng tôi</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
