import React from "react";

const BookMark = (props) => {
    return (
        <button
          className='btn btn-outline-primary'
          onClick={() => props.onToggleBookmark(props.userId)}
        >
            <i className={"bi " + (props.bookmark ? "bi-heart-fill" : "bi-heart")}></i>
        </button>
      )
}

export default BookMark;