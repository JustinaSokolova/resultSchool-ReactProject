import React from 'react'
import Qualities from './qualities'
import Bookmark from './bookmark'

const User = (props) => {
  return (
    <tr>
      <td>{props.name}</td>
      <td>
        <Qualities user={props} />
      </td>
      <td>{props.profession.name}</td>
      <td>{props.completedMeetings}</td>
      <td>{props.rate}/5</td>
      <td>
        <Bookmark
          userId={props._id}
          bookmark={props.bookmark}
          onToggleBookmark={props.onToggleBookmark}
        />
      </td>
      <td  className='d-flex justify-content-center'>
        <button
          className='btn btn-danger'
          onClick={() => props.onDelete(props._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  )
}

export default User
