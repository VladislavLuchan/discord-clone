import React from 'react'
import './Message.css'
import { Avatar } from '@material-ui/core'

const Message = ({ user, timestamp, messageText, avatarURL }) => {
  return (
    <div className="message">
      <Avatar src={avatarURL} />
      <div className="message__info">
        <h4>{user}
          <span className="message__timestamp">{new Date(timestamp?.toDate()).toUTCString()}</span>
        </h4>
        <p>{messageText}</p>
      </div>
    </div>
  )
}

export default Message
