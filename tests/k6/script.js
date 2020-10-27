/* eslint-disable */
import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  vus: 10,
  duration: '30s',
};

export default function () {

// GET ========================

  // review summary for a product
  http.get('http://localhost:7777/review-summary/1');
  // reviews for a product
  http.get('http://localhost:7777/review/1');

// POST ========================
  // var url = 'http://localhost:7777/review-summary/1';
  // var payload = {
  //   "title": "Booby Prize",
  //   "content": "I'll pay you for it...",
  //   "date": "2020-12-12",
  //   "recommended": true,
  //   "quality_rating": 5,
  //   "value_rating": 5,
  //   "star_rating": 5,
  //   "helpful_yes": 55,
  //   "helpful_no": 0,
  //   "user_id": 666
  // };
  // var params = {
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // };
  // http.post(url, payload, params);

  sleep(1);
}
