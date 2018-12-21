import React from 'react';
import PropTypes from 'prop-types';
import styles from './LabeledValue.module.css';


const LabeledValue = ({ label, labelShort, children, style }) => (
  <div className={styles.container} style={style}>
    <div className={styles.label} data-short={labelShort} data-long={label} />
    <div className={styles.content}>{children}</div>
  </div>
);

LabeledValue.propTypes = {
  label: PropTypes.string,
  children: PropTypes.element,
  labelShort: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.string),
};

export default LabeledValue;
