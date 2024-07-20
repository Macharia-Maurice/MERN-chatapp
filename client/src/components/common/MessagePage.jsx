import React, { useState } from 'react';
import { MessageList, Input, Button } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';

const MessagePage = ({ selectedChat, messages }) => {
    const [input, setInput] = useState('');

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

    if (!selectedChat) {
        return <div className="flex items-center justify-center h-full">Select a chat to start messaging</div>;
    }

    return (
        <div className="flex flex-col h-full p-4 bg-gray-100">
            <div className="flex-grow overflow-y-auto bg-white p-4 shadow rounded">
                <MessageList
                    className="message-list"
                    lockable={true}
                    toBottomHeight={"100%"}
                    dataSource={messages}
                />
            </div>
            <div className="mt-4 flex items-center">
                <Input
                    placeholder="Type here..."
                    multiline={false}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-grow"
                    rightButtons={
                        <Button
                            color="white"
                            backgroundColor="blue-500"
                            text="Send"
                            onClick={handleSend}
                            className="ml-2"
                        />
                    }
                />
            </div>
        </div>
    );
};

export default MessagePage;
