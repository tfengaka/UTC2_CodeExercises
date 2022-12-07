import Logo from 'assets/images/IT_Derpart_Logo.png';
import React from 'react';
import CollapsePanel from './CollapsePanel';

const sideBarOptions = [
  {
    title: 'Bài tập',
    children: [
      {
        name: 'Danh sách bài tập',
        path: '/admin/problems',
      },
      {
        name: 'Thêm mới bài tập',
        path: '/admin/problems/create',
      },
    ],
  },
  {
    title: 'Cuộc thi',
    children: [
      {
        name: 'Danh sách cuộc thi',
        path: '/admin/contest',
      },
      {
        name: 'Tạo mới cuộc thi',
        path: '/admin/contest/create',
      },
    ],
  },
  {
    title: 'Blog',
    children: [
      {
        name: 'Danh sách bài viết',
        path: '/admin/blog',
      },
      {
        name: 'Viết bài mới',
        path: '/admin/blog/create',
      },
    ],
  },

  {
    title: 'Khóa học',
    children: [
      {
        name: 'Danh sách khóa học',
        path: '/admin/course',
      },
      {
        name: 'Tạo mới khóa học',
        path: '/admin/course/create',
      },
    ],
  },

  {
    title: 'Thử thách',
    children: [
      {
        name: 'Danh sách Thử thách',
        path: '/admin/challenge',
      },
      {
        name: 'Tạo mới Thử thách',
        path: '/admin/challenge/create',
      },
    ],
  },
];

const SideBar = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <div className="logo_wrapper">
          <img src={Logo} alt="logo" />
        </div>
      </div>
      <div className="option">
        {sideBarOptions.map((option, index) => (
          <CollapsePanel key={index} {...option} />
        ))}
      </div>
    </div>
  );
};

export default SideBar;
