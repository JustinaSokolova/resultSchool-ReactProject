import React from "react";

const BookMark = (props) => {
    return (
        <div className='d-flex justify-content-center'>
        <button
          className='btn border-0'
          onClick={() => props.onToggleBookmark(props.userId)}
        >
            <i className={"bi " + (props.bookmark ? "bi-heart-fill" : "bi-heart")}></i>
        </button>
        </div>
      )
}

export default BookMark;