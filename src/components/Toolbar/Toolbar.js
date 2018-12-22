import React from 'react';
import PropTypes from 'prop-types';
import styles from './Toolbar.module.css';


const Toolbar = props => (
  <div className={styles.container}>
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <ul className={styles.buttonList}>{props.children}</ul>
        {props.secondary ? props.secondary : null}
      </div>
    </div>
  </div>
);

Toolbar.propTypes = {
  children: PropTypes.node,
  secondary: PropTypes.node,
};

export default Toolbar;
