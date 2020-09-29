import React from 'react';
import HelpfulReview from './HelpfulReview';

const MostHelpfulReviews = ({reviewList, mostHelpfulFavorable, mostHelpfulCritical}) => {
  const helpfulFavorable = mostHelpfulFavorable;
  const favorableObject = reviewList && reviewList[helpfulFavorable];
  const helpfulCritical = mostHelpfulCritical;
  const criticalObject = reviewList && reviewList[helpfulCritical];
  console.log('TESST ', favorableObject);

  return (
    <div className="block">
      Most:
      {reviewList && reviewList[helpfulFavorable] && favorableObject.map((helpfulFavorable) => {
        <HelpfulReview
          helpfulFavorable={helpfulFavorable}
          key={helpfulFavorable.review_id}
          />
      })}

      {reviewList && reviewList[helpfulCritical] && criticalObject && criticalObject.map((helpfulCritical) => {
        <HelpfulReview
          helpfulCritical={helpfulCritical}
          key={helpfulCritical.review_id}
          />
      })}
    </div>
  );

};

export default MostHelpfulReviews;
