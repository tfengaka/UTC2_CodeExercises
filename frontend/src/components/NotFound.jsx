import { useRedirect } from 'hooks/useRedirect';
import React from 'react';
import Button from './Button';

function NotFound() {
  const { redirect } = useRedirect('');
  return (
    <div className="notfound">
      <div className="container">
        <div className="notfound_content">
          <span className="notfound_content_title">Sorry, page not found!</span>
          <p className="notfound_content_subtitle">
            {`Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be sure to check your
            spelling.`}
          </p>
          <img src="/static/illustration_404.svg" alt="" />
        </div>
        <Button size="lg" onClick={() => redirect()}>
          Go to Home
        </Button>
      </div>
    </div>
  );
}
export default NotFound;
