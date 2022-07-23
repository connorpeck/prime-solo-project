import React, { useState } from 'react';
import {useSelector} from 'react-redux';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name ReviewForm with the name for the new component.
function ReviewForm(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Review Form!!!!');


  const review ={
    courtName: 'The Tennis Court Name',
    review: 'What a lovely court',
    rating: '5 Stars'
  }

  function addReview () {
    console.log('in add review');
  }
  return (
    <div>
      
      <h2>Court Name: {review.courtName}</h2>
      <h2>Review: <input></input><button onClick={addReview}>Add Review</button></h2> 
      <h2>Rating: {review.rating}</h2>
    </div>
  );
}

export default ReviewForm;
