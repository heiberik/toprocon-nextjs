import React, { useEffect, useState } from 'react'
import { io } from "socket.io-client"
import { getToken } from '../services/tokenService'
import { animateScroll } from "react-scroll";


const Chat = ({ user }) => {

    const [socket, setSocket] = useState(null)
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState("")

    useEffect(() => {

        if (user && !socket) {

            const sock = io.connect({ query: { token: getToken("userInfo").token } });

            sock.on('connect', function () {

                console.log("connected");

                setSocket(sock)

                sock.on('chat_messages', function (messages) {
                    setMessages(messages)   
                    animateScroll.scrollToBottom({ containerId: "messagesDiv" });                
                });

                sock.on('chat_message', function (message) {
                    const div = document.getElementById('messagesDiv')
                    const bottom = div.scrollHeight - div.scrollTop === div.clientHeight;
                    setMessages(messages => messages.concat(message))
                    if (bottom){
                        animateScroll.scrollToBottom({ containerId: "messagesDiv" });
                    }                    
                });
   
                sock.on('disconnect', () => {
                    sock.removeAllListeners();
                });
            });
        }
    }, [user, socket])

    const inputChangeHandler = (e) => {
        setMessage(e.target.value)
    }

    const sendClick = (e) => {
        e.preventDefault()
        if (socket && message.length > 0) {
            setMessage("")
            socket.emit('chat_message', message);
        }
    }

    const inputStyle = {
        marginRight: "5px",
        flex: "2"
    }

    const buttonStyle = {
        marginBottom: "10px"
    }

    const messagesStyle = {
        padding: "10px",
        overflow: "scroll"
    }

    const inputBoxStyle = {
        display: "flex",
        backgroundColor: "orange",
        padding: "10px",
        paddingBottom: "0px",
        borderBottomRightRadius: "5px",
        borderBottomLeftRadius: "5px",
        borderTop: "solid 1px black"
    }

    const messageContainerStyle = {
        display: "flex",
        alignItems: "flex-end"
    }

    const usernameStyle = {
        color: "orange",
        fontSize: "12px",
        marginRight: "5px"
    }

    const textStyle = {

    }

    if (user) {
        return (
            <div className="container-chat">
                <div style={messagesStyle} id="messagesDiv">
                    {messages.map((message, index) =>
                        <div key={index} style={messageContainerStyle}>
                            <p style={usernameStyle}> {message.username} </p>
                            <p style={textStyle}> {message.message} </p>
                        </div>
                    )}
                </div>
                <form style={inputBoxStyle} onSubmit={sendClick} >
                    <input onChange={inputChangeHandler} value={message} style={inputStyle} />
                    <button style={buttonStyle} type="submit"> Send </button>
                </form>
            </div>
        )
    }
    else {
        return (
            <div className="container-chat" style={{ alignItems: "center", justifyContent: "center" }}>
                <p> Login / register to use chat</p>
            </div>
        )
    }

}

export default Chat