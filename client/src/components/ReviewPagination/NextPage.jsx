/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './ReviewPagination.css';

const NextPage = ({ handleClick, pageNumber, id }) => (
  <span
    className={styles.pagination_numbers}
    id={id}
    onClick={handleClick}
  >
    {`${pageNumber} `}
  </span>
);

NextPage.propTypes = {
  handleClick: PropTypes.func,
  pageNumber: PropTypes.number,
  id: PropTypes.number,
};

NextPage.defaultProps = {
  handleClick: () => 'click',
  pageNumber: 1,
  id: 1,
};

export default NextPage;
