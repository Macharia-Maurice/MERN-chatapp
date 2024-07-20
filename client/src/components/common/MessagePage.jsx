import React, { useState, useEffect } from 'react';
import { MessageList, Input, Button, MessageBox } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';

const MessagePage = ({ selectedChat, messages }) => {
    const [input, setInput] = useState('');
    const [messageList, setMessageList] = useState(messages);
    const [replyingTo, setReplyingTo] = useState(null);

    // Handle sending a new message
    const handleSend = () => {
        if (input.trim() !== '') {
            const newMessage = {
                position: 'right',
                type: 'text',
                text: input,
                date: new Date(),
                reply: replyingTo ? {
                    photoURL: replyingTo.avatar,
                    title: replyingTo.title,
                    message: replyingTo.text,
                } : null,
            };

            setMessageList(prevMessages => [...prevMessages, newMessage]);
            setInput('');
            setReplyingTo(null); // Clear reply state after sending
        }
    };

    // Update message list when selected chat or messages change
    useEffect(() => {
        setMessageList(messages);
    }, [selectedChat, messages]);

    // Handle clicking on a message to reply
    const handleReplyClick = (message) => {
        setReplyingTo(message); // Set the message to reply to
    };

    // Display a placeholder message if no chat is selected
    if (!selectedChat) {
        return <div className="flex items-center justify-center h-full text-gray-500">Select a chat to start messaging</div>;
    }

    return (
        <div className="flex flex-col h-full bg-gray-50">
            {/* Message list container */}
            <div className="flex-grow overflow-y-auto p-4 shadow rounded-lg ">
                <MessageList
                    className="message-list"
                    lockable={true}
                    toBottomHeight={"100%"}
                    dataSource={messageList}
                    onMessageClick={handleReplyClick} // Handle click to reply
                />
            </div>
            {/* Input field and send button */}
            <div className="flex items-center">
                <Input
                    placeholder="Type here..."
                    multiline={false}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-grow border border-gray-300 rounded-l-lg py-2 px-4"
                    rightButtons={
                        <Button
                            color="white"
                            backgroundColor="blue-500"
                            text="Send"
                            onClick={handleSend}
                            className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                        />
                    }
                />
            </div>
        </div>
    );
};

export default MessagePage;
