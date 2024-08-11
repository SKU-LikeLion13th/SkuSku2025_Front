import React from 'react';
import PropTypes from 'prop-types';

const AssignmentTitle = ({ children, variant }) => {
  const styles = {
    title: 'text-6xl fontEB text-blue-500 mb-4 mt-24',
    subtitle: 'text-6xl fontEB mb-12 text-black',
  };

  return <div className={styles[variant]}>{children}</div>;
};

AssignmentTitle.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['title', 'subtitle']).isRequired,
};

export default AssignmentTitle;
