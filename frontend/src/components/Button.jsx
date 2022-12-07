import React from 'react';
function Button(props) {
  const backgroundColor = props.backgroundColor ? 'bg-' + props.backgroundColor : 'bg-main';
  const size = props.size ? 'btn-' + props.size : '';
  const isDisabled = props.isDisabled;
  return (
    <button
      type={props.type}
      className={`btn ${backgroundColor} ${size} ${isDisabled ? 'disabled' : ''}`}
      onClick={props.onClick}
      disabled={isDisabled}
    >
      {props.children}
    </button>
  );
}
export default Button;
