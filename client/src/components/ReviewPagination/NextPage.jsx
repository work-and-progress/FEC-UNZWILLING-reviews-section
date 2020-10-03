/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './ReviewPagination.css';

class NextPage extends React.Component {
  constructor() {
    super();
    this.state = {
      currentPage: 1,
    };
  }

  render() {
    // console.log('props from nextpage', this.props)
    const {
      totalNumberReviews,
      handleClick,
      pageNumber,
      id,
    } = this.props;

    return (
      <div>
        <span  id={id} onClick={handleClick}>{pageNumber}</span>

        {/* <div className={styles.block}>
          <span>
            {`${totalNumberReviews}-${totalNumberReviews} of ${totalNumberReviews} reviews`}
          </span>
        </div> */}

      </div>



        // <div className={styles.buttons}>
        //   <button className={styles.back_button} type="button" onClick={handleClick}>
        //     ◄
        //   </button>
        //   <button className={styles.next_button} type="button" onClick={handleClick}>
        //     ►
        //   </button>
        // </div>

    );
  }
}

NextPage.propTypes = {
  totalNumberReviews: PropTypes.number,
};

NextPage.defaultProps = {
  totalNumberReviews: 0,
};

export default NextPage;
