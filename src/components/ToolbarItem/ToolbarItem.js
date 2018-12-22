import React from 'react';
import PropTypes from 'prop-types';
import styles from './ToolbarItem.module.css';


const ToolbarItem = ({ active, onClick, children }) => {
  const wrapperStyle = `${styles.toolbarItem} ${active ? styles.active : ''}`;
  return (
    <li className={wrapperStyle} role="presentation" onClick={onClick}>
      {children}
    </li>
  );
};

ToolbarItem.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

export default ToolbarItem;
