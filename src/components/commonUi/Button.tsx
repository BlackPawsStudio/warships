import React, { ReactChild } from 'react';
import './style.css';

interface PropsType {
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  children?: ReactChild | ReactChild[];
  disabled?: boolean;
}

const Button = (props: PropsType) => {
  const { onClick, children, disabled } = props;
  return (
    <button
      disabled={disabled}
      className='button'
      onClick={() => onClick && onClick()}
    >
      {children}
    </button>
  );
};

export default Button;
