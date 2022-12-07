import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
const ComingSoon = () => {
  return (
    <div className="notfound">
      <div className="container">
        <div className="notfound_content">
          <span className="notfound_content_title">Coming Soon!</span>
          <p className="notfound_content_subtitle">We are currently working hard on this page!</p>
          <img src="/static/illustration_Coming.svg" alt="" />
        </div>
        <Button size="lg">
          <Link to="/">Go To Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default ComingSoon;
