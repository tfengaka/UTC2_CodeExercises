import React from 'react';

const Helmet = ({ title, children }) => {
  document.title = title + ' | CodingWar';
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <React.Fragment>{children}</React.Fragment>;
};
export default Helmet;
