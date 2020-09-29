import React from 'react';

const MostHelpfulReviews = ({mostHelpfulFavorable, mostHelpfulCritical}) => (
  <div className="block">
    <span>Most Helpful Favorable Review, ID: {mostHelpfulFavorable} &nbsp;&nbsp;</span>
    <span>Most Helpful Critical Review, ID: {mostHelpfulCritical}</span>
  </div>
);

export default MostHelpfulReviews;
