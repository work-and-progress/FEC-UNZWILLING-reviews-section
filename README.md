# FEC-UNZWILLING-reviews-section

## REST API for Reviews

### REST API

| **CRUD** | **Method** 	| **URL** | **Key Parameter** | **Purpose** | **Response** |
| --- | --- | --- | --- | --- | --- |
| Create | POST | /review | product\_id | Add review for a product | 201 |
| Read | GET | /review | product\_id | Retrieve reviews for a product | 200 + x ‘qty’ reviews (JSON) |
| Update | PUT | /review | review\_id | Update a review for a product | 201 |
| Delete | DELETE | /review | review\_id | Delete a specific review | 200 |


### Additional Parameters

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| qty | integer | Specify quantity of results to return |
| sort | string | Sort criteria by &#39;highest&#39; or &#39;lowest&#39;  ratings or most &#39;recent&#39; |
| offset | integer | Allows &#39;skipping&#39; over data. Useful for retrieving additional pages of data |


### Data Schema (SQL)

<a width="100%" href="https://ibb.co/GC0B1QS"><img src="https://i.ibb.co/9yNzfH5/Screen-Shot-2020-10-16-at-1-13-53-AM.png" alt="Screen-Shot-2020-10-16-at-1-13-53-AM" border="0"></a>

<!--
#### Review Schema

```
const **Review** = mongoose.Schema({
  reviewId: Number,
  reviewUsername: String,
  reviewContent: String,
  reviewTitle: String,
  userId: Number,
  reviewDate: Number,
  qualityRating: Number,
  valueRating: Number,
  frequencyOfUse: String,
  starRating: Number,
  reviewRecommended: Boolean,
  helpfulYes: Number,
  helpfulNo: Number,
});
```
#### Review Summary Schema

```
const **ReviewSummarySchema** = mongoose.Schema({
  productId: Number,
  totalNumberReviews: Number,
  averageStarRating: Number,
  averageQualityRating : Number,
  averageValueRating : Number,
  aggregateOneStarReview : Number,
  aggregateTwoStarReview : Number,
  aggregateThreeStarReview : Number,
  aggregateFourStarReview : Number,
  aggregateFiveStarReview : Number,
  mostHelpfulFavorable : Number,
  mostHelpfulCritical : Number,
  reviews** : [Review],
});
```
-->


### Data Schema (Cassandra)
Coming soon!

### Seeding strategy

#### Postgres
* Generate 3 CSV files for:
  * Product (review summary) - 10 million records
  * Review - 200x the number of product records
  * User - 0.5x the number of review records

### User stories

As user, I want to:

- write a review
- read x qty most recent reviews to find out 1) how the product holds up over time, 2) find out about recent production products
- read highest-rated reviews to see why the product is good
- read lowest-rated reviews to see weaknesses of product
- update a review
- delete a review


  
  :octocat:   :computer:
  
<!--
## UI update
<img src='design-and-docs/finprogress1.png'>
<img src='design-and-docs/finprogress2.png'>
<img src='design-and-docs/finprogress3.png'>


## File Structure (updated, final)
<img src='design-and-docs/file-structure.png'>

## Component names (updated)
<img src='design-and-docs/final-layout.png'>
-->
