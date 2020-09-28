/* eslint-disable no-console */
import React from 'react';
import axios from 'axios';

import ReviewOverview from './ReviewOverview';
import MostHelpfulReviews from './MostHelpfulReviews';
import SortAndProgress from './SortAndProgress';
import IndividualReview from './IndividualReview';
import NextPageAndProgress from './NextPageAndProgress';

/*--------------------------------*/

export const dataReducer = (state, action) => {
  if (action.type === 'SET_ERROR') {
    return { ...state, oneItem: [], error: true };
  }
  if (action.type === 'SET_oneItem') {
    return { ...state, oneItem: action.oneItem, error: null };
  }
  throw new Error();
};

/*--------------------------------*/

const initialData = {
  oneItem: {},
  error: null,
};

const App = () => {
  // const [counter, setCounter] = React.useState(0);
  const [data, dispatch] = React.useReducer(dataReducer, initialData);

  // Similar to componentDidMount and componentDidUpdate:
  React.useEffect(() => {
    axios
      .get('http://localhost:3000/review/1')
      .then((response) => {
        console.log(response.data);
        dispatch({ type: 'SET_oneItem', oneItem: response.data });
      })
      .catch(() => {
        dispatch({ type: 'SET_ERROR' });
      });
  }, []);

  return (
    <div>
      {/* <Counter counter={counter} /> */}
      <span
        className="hover-hand"
        type="button"
        // onClick=
      >
        Reviews &nbsp;&nbsp;
      </span>
      <span
        className="hover-hand"
        type="button"
        // onClick=
      >
        Questions
      </span>

      <h5>Data from db:</h5>
      {data.error && <div className="error">Error</div>}
      <p>
        Product ID:
        {data.oneItem.product_id}
      </p>
      <p>
        Aggregate star rating:
        {data.oneItem.aggregate_star_rating}
      </p>
      <p>
        Total number of reviews:
        {data.oneItem.total_number_reviews}
      </p>
    </div>
  );
};

// export const Counter = ({ counter }) => (
//   <div>
//     <p>{counter}</p>
//   </div>
// );

export default App;
