import React from 'react';
import PropTypes from 'prop-types';
import styles from './TitleBar.scss';

const TitleBar = ({ title }) => (
  <div className={styles.container}>
    <div className={styles.wrapper}>
      <h2>
        <em className={styles.title}>{title}</em>
        <span className={styles.date}>
          {new Date(Date.now()).toLocaleString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </span>
      </h2>
    </div>
  </div>
);

TitleBar.propTypes = { title: PropTypes.string };

export default TitleBar;
