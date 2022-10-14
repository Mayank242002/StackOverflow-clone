import React from 'react'
import "./Tags.css";

const TagsList= ({tag}) => {
  return (
    <div>
        <div className='tag'>
            <h5>{tag.tagName}</h5>
            <p>{tag.tagDesc}</p>
        </div>
    </div>
  )
}

export default TagsList;
