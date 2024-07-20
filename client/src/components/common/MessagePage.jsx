import React, { useState } from 'react';
import { MessageList, Input, Button } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';

const MessagePage = ({ selectedChat, messages }) => {
    // State to manage the message input field
    const [input, setInput] = useState('');

    // Handle sending a new message
    const handleSend = () => {
        if (input.trim() !== '') {
            const newMessage = {
                position: 'right',
                type: 'text',
                text: input,
                date: new Date(),
            };
            // Add message sending logic here (e.g., update state or send to API)
            setInput('');
        }
    };

    // Display a placeholder message if no chat is selected
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
                    toBottomHeight={"100%"} // Scrolls to the bottom automatically
                    dataSource={messages} // Messages to be displayed
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
                            backgroundColor="blue-500"
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
