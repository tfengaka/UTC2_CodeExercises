import React from 'react';

const Dropdown = ({ setActive, children, darkMode = false }) => {
  const nodeRef = React.useRef(null);
  const [mounted, setMounted] = React.useState(true);
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (nodeRef && !nodeRef.current?.contains(event.target)) {
        setMounted(false);
        setTimeout(() => {
          setActive(false);
        }, 300);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [setActive]);
  return (
    <div className={`dropdown ${!darkMode ? 'light' : 'dark'} ${mounted ? 'mounted' : 'unmounted'}`} ref={nodeRef}>
      {children}
    </div>
  );
};

export default Dropdown;
