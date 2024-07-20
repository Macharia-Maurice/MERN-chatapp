import React, { useState } from 'react';
import {
    MessageList,
    Input,
    Button,
} from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';

const MessagePage = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (input.trim() !== '') {
            const newMessage = {
                position: 'right',
                type: 'text',
                text: input,
                date: new Date(),
            };
            setMessages([...messages, newMessage]);
            setInput('');
        }
    };

    return (
        <div className="flex flex-col h-screen p-4 bg-gray-100">
            <div className="flex-grow overflow-y-auto bg-white p-4 shadow rounded">
                <MessageList
                    className="message-list"
                    lockable={true}
                    toBottomHeight={"100%"}
                    dataSource={messages}
                />
            </div>
            <div className="mt-4">
                <Input
                    placeholder="Type here..."
                    multiline={false}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    rightButtons={
                        <Button
                            color="white"
                            backgroundColor="blue-500"
                            text="Send"
                            onClick={handleSend}
                        />
                    }
                />
            </div>
        </div>
    );
};

export default MessagePage;
