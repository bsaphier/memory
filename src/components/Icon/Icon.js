import React from 'react';
import PropTypes from 'prop-types';
import './Icon.module.css';


const Icon = ({ src, alt = 'icon', className }) => <img src={src} alt={alt} className={className} />;

Icon.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  className: PropTypes.string,
};

export default Icon;
