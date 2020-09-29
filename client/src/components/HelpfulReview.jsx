import React from 'react';

const HelpfulReview = ({helpfulFavorable}) => {
  console.log('helpfulFavorable', helpfulFavorable);
  return (
    <div>
      <div className="inline-block">
        <span>Star Rating: {helpfulFavorable.star_rating}&nbsp;&nbsp;</span>
        <span>Username: {helpfulFavorable.review_username}&nbsp;&nbsp;</span>
        <span>Date Posted: {helpfulFavorable.review_date} months ago</span>
        <p>Review title: {helpfulFavorable.review_title}</p>
        <span>
          Review content: {helpfulFavorable.review_content}
        </span>
        <span>{helpfulFavorable.helpful_yes} out of {helpfulFavorable.helpful_yes} found this helpful</span>
      </div>

      {/* <div className="inline-block">
        <span>Star Rating: {helpfulCritical.star_rating}&nbsp;&nbsp;</span>
        <span>Username: {helpfulCritical.review_username}&nbsp;&nbsp;</span>
        <span>Date Posted: {helpfulCritical.review_date} months ago</span>
        <p>Review title: {helpfulCritical.review_title}</p>
        <span>
          Review content: {helpfulCritical.review_content}
        </span>
        <span>{helpfulCritical.helpful_yes} out of {helpfulCritical.helpful_yes} found this helpful</span>
      </div> */}
  </div>
  );
};

export default HelpfulReview;