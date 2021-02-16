import React, { useState, useEffect} from 'react'
import './Chat.css'
import ChatHeader from './ChatHeader'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import GifIcon from '@material-ui/icons/Gif';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import Message from './Message';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice'
import { selectChannelId, selectChanneName } from '../../features/appSlice'
import db from '../../firebase';
import firebase from 'firebase';

const Chat = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const channelName = useSelector(selectChanneName)
  const channelId = useSelector(selectChannelId)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState([])

  useEffect(() => {
    if(channelId) {
      db.collection('channels')
      .doc(channelId)
      .collection("messages")
      .orderBy('timestamp')
      .onSnapshot(snapshot => {
        setMessages(snapshot.docs.map(doc => doc.data()))
      })
    }
  }, [channelId])

  useEffect(() => {
    if(document.getElementById('chat__section').lastElementChild) {
      document.getElementById('chat__section').lastElementChild.scrollIntoView()
    }
    
    // console.log(messages)
    
  }, [messages])

  const sendMessage = e => {
    e.preventDefault()
    db.collection('channels').doc(channelId).collection('messages').add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user
    })
    setInput("")
  }

  return (
    <div className="chat">
      <ChatHeader channelName={channelName} />

      { !channelId ? ( <h1 class="chat__noChannel">Proceed to a channel or create one</h1> ) : null}

      <div className="chat__messages" id="chat__section">
        {messages.map((message, i) => (
          <Message key={i} messageText={message.message} timestamp={message.timestamp} user={message.user.displayName} avatarURL={message.user.photo} id={`msg-${i + 1}`} />
        ))}
      </div>

      <div className="chat__input">
        <AddCircleIcon fontSize="large" />
        <form>
          <input type="text" disabled={!channelId} value={input} onChange={e => setInput(e.target.value)} placeholder={`Message #TESTCHANNEL`} />
          <button type="submit" className="chat__inputButton" onClick={sendMessage}>Send Message</button>
        </form>

        <div className="chat__inputIcons">
          <CardGiftcardIcon fontSize="large" />
          <GifIcon fontSize="large" />
          <EmojiEmotionsIcon fontSize="large" />
        </div>
      </div>
    </div>
  )
}

export default Chat
