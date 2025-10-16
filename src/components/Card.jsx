import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ title, children, className = '' }) => (
  <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 ${className}`}>
    {title && <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">{title}</h3>}
    <div className="text-gray-600 dark:text-gray-300">{children}</div>
  </div>
);

Card.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Card;
