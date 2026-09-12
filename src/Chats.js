import React from 'react'
import './Chats.css'
import Chat from './Chat'

function Chats() {
  return (
    <div className='chats'>
        <Chat
            name='Parama chundari'
            message='Ente peru Thekkepattu Sundari Damodharan Pillai!'
            timestamp='40 seconds ago'
            profilePic='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_wgCw6yN0FS8DTtbx9yFLVz-hWtHPcHQhtEhXpLkFzg&s=10'
        />
        <Chat
            name="Joey"
            message="Whatcha doin"
            timestamp="55 minutes ago"
            profilePic="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThCT1WiF8H04-4cYM-I0nZPysiI-VZJMS_6ESlU7BpNg&s=10"
        />
        <Chat
            name="Billy"
            message="Oii!"
            timestamp="3 days ago"
            profilePic="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdmRNayvR86eH4SaRMmsOjad62bupXSfXf-tYMidEsZA&s=10"
        />
        <Chat
            name="Muthu pandi"
            message="hey Chello"
            timestamp="1 week ago"
            profilePic="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsfa2JHG__08oGKUA0W_k8go19ZW-Zihmv7TFxInQ4zg&s=10"
        />
        <Chat
            name='Amaran'
            message='Hey mammooty!'
            timestamp='40 seconds ago'
            profilePic='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO_O0DKReDVnHmVb4hvRt3MqolTNoJqYByG2VTFp4gsSG3PQ9sfFXRabY&s=10'
        />
    </div>
  )
}

export default Chats
