import React, { useState, useEffect } from 'react';
import { MessageList, Input, Button, MessageBox } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';

const MessagePage = ({ selectedChat, messages }) => {
    // State to manage the input field value
    const [input, setInput] = useState('');
    
    // State to manage the list of messages, including the newly sent ones
    const [messageList, setMessageList] = useState(messages);
    
    // State to manage the reply-to functionality
    const [replyingTo, setReplyingTo] = useState(null);

    // Handle sending a new message
    const handleSend = () => {
        if (input.trim() !== '') {
            // Create a new message object
            const newMessage = {
                position: 'right', // Position of the message (right for current user)
                type: 'text', // Type of the message (text)
                text: input, // Message text
                date: new Date(), // Timestamp of when the message was sent
                reply: replyingTo ? {
                    photoURL: replyingTo.avatar, // Avatar of the user being replied to
                    title: replyingTo.title, // Name of the user being replied to
                    message: replyingTo.text, // Original message being replied to
                } : null, // Include reply information if replyingTo state is set
            };

            // Update message list with the new message
            setMessageList(prevMessages => [...prevMessages, newMessage]);
            setInput(''); // Clear the input field after sending
            setReplyingTo(null); // Clear the reply state after sending
        }
    };

    // Effect to update messageList when selectedChat or messages change
    useEffect(() => {
        setMessageList(messages);
    }, [selectedChat, messages]);

    // Handle click on a message to start replying
    const handleReplyClick = (message) => {
        setReplyingTo(message); // Set the message to reply to
    };

    // Display placeholder if no chat is selected
    if (!selectedChat) {
        return <div className="flex items-center justify-center h-full">Select a chat to start messaging</div>;
    }

    return (
        <div className="flex flex-col h-full p-4">
            {/* Message list container */}
            <div className="flex-grow overflow-y-auto bg-white p-4 shadow rounded">
                <MessageList
                    className="message-list"
                    lockable={true} // Locks the scroll position when at the bottom
                    toBottomHeight={"100%"} // Automatically scrolls to the bottom when new messages are added
                    dataSource={messageList.map(msg => ({
                        ...msg,
                        reply: msg.reply ? {
                            ...msg.reply,
                            onClick: () => handleReplyClick(msg) // Handle click on reply
                        } : null
                    }))} // Map through messageList and pass reply data
                    onMessageClick={handleReplyClick} // Handle click to reply
                />
            </div>
            {/* Input field and send button */}
            <div className="mt-4 flex items-center">
                <Input
                    placeholder="Type here..." // Placeholder text for input field
                    multiline={false} // Single-line input field
                    value={input} // Current value of the input field
                    onChange={(e) => setInput(e.target.value)} // Update input state on change
                    className="flex-grow" // Take up remaining space in the container
                    rightButtons={
                        <Button
                            color="white"
                            backgroundColor="blue-500" // Background color for the send button
                            text="Send" // Text on the send button
                            onClick={handleSend} // Handle sending message on click
                            className="ml-2" // Margin left to separate from input field
                        />
                    }
                />
            </div>
        </div>
    );
};

export default MessagePage;
